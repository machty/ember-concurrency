"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_1 = __importDefault(require("resolve"));
const rsvp_1 = require("rsvp");
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default('ember-cli-typescript:typecheck-worker');
// The compiler has a hard-coded 250ms wait between when it last sees an FS event and when it actually
// begins a new build. Since we can't know ahead of time whether a given file change will necessarily
// trigger a new check, we assume it will and set a timer to go back to the previous resolution if
// a new check doesn't actually start.
// https://github.com/Microsoft/TypeScript/blob/c0587191fc536ca62b68748b0e47072e6f881968/src/compiler/watch.ts#L812-L825
const TYPECHECK_TIMEOUT = 300;
class TypecheckWorker {
    constructor() {
        this.typecheckListeners = [];
        this.isChecking = true;
        this.status = rsvp_1.defer();
        this.lastSettledStatus = this.status;
    }
    /**
     * Begin project typechecking, loading TypeScript from the given project root.
     */
    start(projectRoot) {
        this.projectRoot = projectRoot;
        this.ts = this.loadTypeScript();
        this.watch = this.ts.createWatchProgram(this.buildWatchHost());
        this.compilerOptions = this.watch.getProgram().getCompilerOptions();
    }
    /**
     * Returns the current typechecking status, blocking until complete if a
     * check is currently in progress.
     */
    getStatus() {
        return this.status.promise;
    }
    /**
     * Accepts a callback that will be invoked any time a check completes,
     * receiving a `TypecheckStatus` payload describing the results.
     */
    onTypecheck(listener) {
        this.typecheckListeners.push(listener);
    }
    loadTypeScript() {
        return require(resolve_1.default.sync('typescript', { basedir: this.projectRoot }));
    }
    mayTypecheck(filePath) {
        debug('File change at %s; watching for new typecheck', filePath);
        this.beginCheck();
        this.typecheckTimeout = setTimeout(() => {
            debug(`File change didn't result in a typecheck; resolving`);
            this.isChecking = false;
            this.status.resolve(this.lastSettledStatus.promise);
        }, TYPECHECK_TIMEOUT);
    }
    willTypecheck() {
        debug('Typecheck starting');
        this.beginCheck();
    }
    didTypecheck(diagnostics) {
        if (this.isChecking) {
            debug('Typecheck complete (%d diagnostics)', diagnostics.length);
            let status = this.makeStatus(diagnostics);
            this.isChecking = false;
            this.status.resolve(status);
            this.lastSettledStatus = this.status;
            for (let listener of this.typecheckListeners) {
                listener(status);
            }
        }
    }
    beginCheck() {
        if (this.typecheckTimeout !== undefined) {
            clearTimeout(this.typecheckTimeout);
        }
        if (!this.isChecking) {
            this.isChecking = true;
            this.status = rsvp_1.defer();
        }
    }
    formatDiagnostic(diagnostic) {
        return this.ts.formatDiagnosticsWithColorAndContext([diagnostic], {
            getCanonicalFileName: path => path,
            getCurrentDirectory: this.ts.sys.getCurrentDirectory,
            getNewLine: () => this.ts.sys.newLine,
        });
    }
    buildWatchHost() {
        let host = this.ts.createWatchCompilerHost(this.findConfigFile(), { noEmit: true }, this.ts.sys, this.ts.createSemanticDiagnosticsBuilderProgram, 
        // Pass noop functions for reporters because we want to print our own output
        () => { }, () => { });
        return this.patchCompilerHostMethods(host);
    }
    // The preferred means of being notified when things happen in the compiler is
    // overriding methods and then calling the original. See the TypeScript wiki:
    // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
    patchCompilerHostMethods(host) {
        let { watchFile, watchDirectory, createProgram, afterProgramCreate = () => { } } = host;
        // Intercept tsc's `watchFile` to also invoke `mayTypecheck()` when a watched file changes
        host.watchFile = (path, callback, pollingInterval) => {
            return watchFile.call(host, path, (filePath, eventKind) => {
                this.mayTypecheck(filePath);
                return callback(filePath, eventKind);
            }, pollingInterval);
        };
        // Intercept tsc's `watchDirectory` callback to also invoke `mayTypecheck()` when a
        // file is added or removed in a watched directory.
        host.watchDirectory = (path, callback, recursive) => {
            return watchDirectory.call(host, path, (filePath) => {
                this.mayTypecheck(filePath);
                return callback(filePath);
            }, recursive);
        };
        // Intercept `createProgram` to invoke `willTypecheck` beforehand, as we know at this
        // point that a new check is definitively happening.
        host.createProgram = (...params) => {
            this.willTypecheck();
            return createProgram.apply(host, params);
        };
        host.afterProgramCreate = program => {
            // The `afterProgramCreate` callback will be invoked synchronously when we first call
            // `createWatchProgram`, meaning we can enter `didTypecheck` before we're fully set up
            // (e.g. before `compilerOptions` has been set). We use `nextTick` to ensure that
            // `didTypecheck` is only ever invoked after the worker is fully ready.
            process.nextTick(() => this.didTypecheck(program.getSemanticDiagnostics()));
            return afterProgramCreate.call(host, program);
        };
        return host;
    }
    makeStatus(diagnostics) {
        let errors = diagnostics.map(d => this.formatDiagnostic(d));
        let failed = !!(this.compilerOptions.noEmitOnError && errors.length);
        return { errors, failed };
    }
    findConfigFile() {
        let configPath = this.ts.findConfigFile(this.projectRoot, this.ts.sys.fileExists, 'tsconfig.json');
        if (!configPath) {
            throw new Error(`Unable to locate tsconfig.json for project at ${this.projectRoot}`);
        }
        return configPath;
    }
}
exports.default = TypecheckWorker;
