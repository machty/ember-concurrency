"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = __importDefault(require("semver"));
const child_process_1 = require("stagehand/lib/adapters/child-process");
const ember_cli_babel_plugin_helpers_1 = require("ember-cli-babel-plugin-helpers");
const ember_cli_entities_1 = require("./lib/utilities/ember-cli-entities");
const fork_1 = __importDefault(require("./lib/utilities/fork"));
const middleware_1 = __importDefault(require("./lib/typechecking/middleware"));
const walk_sync_1 = __importDefault(require("walk-sync"));
const fs_extra_1 = __importDefault(require("fs-extra"));
exports.default = ember_cli_entities_1.addon({
    name: 'ember-cli-typescript',
    included() {
        this._super.included.apply(this, arguments);
        this._checkDevelopment();
        this._checkAddonAppFiles();
        this._checkBabelVersion();
        // If we're a direct dependency of the host app, go ahead and start up the
        // typecheck worker so we don't wait until the end of the build to check
        if (this.parent === this.project) {
            this._getTypecheckWorker();
            this._checkInstallationLocation();
            this._checkEmberCLIVersion();
        }
    },
    includedCommands() {
        if (this.project.isEmberCLIAddon()) {
            return {
                'ts:precompile': require('./lib/commands/precompile').default,
                'ts:clean': require('./lib/commands/clean').default,
            };
        }
    },
    blueprintsPath() {
        return `${__dirname}/blueprints`;
    },
    serverMiddleware({ app }) {
        this._addTypecheckMiddleware(app);
    },
    testemMiddleware(app) {
        this._addTypecheckMiddleware(app);
    },
    postBuild() {
        return __awaiter(this, void 0, void 0, function* () {
            // This code makes the fundamental assumption that the TS compiler's fs watcher
            // will notice a file change before the full Broccoli build completes. Otherwise
            // the `getStatus` call here might report the status of the previous check. In
            // practice, though, building takes much longer than the time to trigger the
            // compiler's "hey, a file changed" hook, and once the typecheck has begun, the
            // `getStatus` call will block until it's complete.
            let worker = yield this._getTypecheckWorker();
            let { failed } = yield worker.getStatus();
            if (failed) {
                // The actual details of the errors will already have been printed
                // with nice highlighting and formatting separately.
                throw new Error('Typechecking failed');
            }
        });
    },
    setupPreprocessorRegistry(type) {
        if (type !== 'parent')
            return;
        // Normally this is the sort of logic that would live in `included()`, but
        // ember-cli-babel reads the configured extensions when setting up the
        // preprocessor registry, so we need to beat it to the punch.
        this._registerBabelExtension();
        this._addPluginIfMissing('@babel/plugin-proposal-class-properties', { loose: true }, {
            // Needs to come after the decorators plugin, if present
            after: ['@babel/plugin-proposal-decorators'],
        });
        // Needs to come after the class properties plugin (see tests/unit/build-test.ts -
        // "property initialization occurs in the right order")
        this._addPluginIfMissing('@babel/plugin-transform-typescript');
    },
    shouldIncludeChildAddon(addon) {
        // For testing, we have dummy in-repo addons set up, but e-c-ts doesn't depend on them;
        // its dummy app does. Otherwise we'd have a circular dependency.
        return !['in-repo-a', 'in-repo-b'].includes(addon.name);
    },
    _checkBabelVersion() {
        let babel = this.parent.addons.find(addon => addon.name === 'ember-cli-babel');
        let version = babel && babel.pkg.version;
        if (!babel || !(semver_1.default.gte(version, '7.1.0') && semver_1.default.lt(version, '8.0.0'))) {
            let versionString = babel ? `version ${babel.pkg.version}` : `no instance of ember-cli-babel`;
            this.ui.writeWarnLine(`ember-cli-typescript requires ember-cli-babel ^7.1.0, but you have ${versionString} installed; ` +
                'your TypeScript files may not be transpiled correctly.');
        }
    },
    _checkEmberCLIVersion() {
        let cliPackage = this.project.require('ember-cli/package.json');
        if (semver_1.default.lt(cliPackage.version, '3.5.0')) {
            this.ui.writeWarnLine('ember-cli-typescript works best with ember-cli >= 3.5, which uses the system temporary directory ' +
                'by default rather than a project-local one, minimizing file system events the TypeScript ' +
                'compiler needs to keep track of.');
        }
    },
    _checkDevelopment() {
        if (this.isDevelopingAddon() && !process.env.CI && __filename.endsWith('.js')) {
            this.ui.writeWarnLine('ember-cli-typescript is in development but not being loaded from `.ts` sources — ' +
                'do you have compiled artifacts lingering in `/js`?');
        }
    },
    _checkAddonAppFiles() {
        // Emit a warning for addons that are under active development...
        let isDevelopingAddon = !this.app && this.parent.isDevelopingAddon();
        // ...and are at the root of the project (i.e. not in-repo)...
        let isRootAddon = this.parent.root === this.project.root;
        // ...and have .ts files in their `app` directory.
        let appDir = `${this.parent.root}/app`;
        if (isDevelopingAddon && isRootAddon && fs_extra_1.default.existsSync(appDir)) {
            let tsFilesInApp = walk_sync_1.default(appDir, { globs: ['**/*.ts'] });
            if (tsFilesInApp.length) {
                this.ui.writeWarnLine(`found .ts files in ${appDir}\n` +
                    'ember-cli-typescript only compiles files in an addon\'s `addon` folder; ' +
                    'see https://github.com/typed-ember/ember-cli-typescript/issues/562');
            }
        }
    },
    _checkInstallationLocation() {
        if (this.project.isEmberCLIAddon() &&
            this.project.pkg.devDependencies &&
            this.project.pkg.devDependencies[this.name]) {
            this.ui.writeWarnLine('`ember-cli-typescript` should be included in your `dependencies`, not `devDependencies`');
        }
    },
    _addPluginIfMissing(name, config, constraints) {
        let target = this._getConfigurationTarget();
        if (!ember_cli_babel_plugin_helpers_1.hasPlugin(target, name)) {
            let resolvedPath = require.resolve(name);
            let pluginEntry = config ? [resolvedPath, config] : resolvedPath;
            ember_cli_babel_plugin_helpers_1.addPlugin(target, pluginEntry, constraints);
        }
    },
    _getConfigurationTarget() {
        // If `this.app` isn't present, we know `this.parent` is an addon
        return this.app || this.parent;
    },
    _registerBabelExtension() {
        let target = this._getConfigurationTarget();
        let options = target.options || (target.options = {});
        let babelAddonOptions = options['ember-cli-babel'] || (options['ember-cli-babel'] = {});
        let extensions = babelAddonOptions.extensions || (babelAddonOptions.extensions = ['js']);
        if (!extensions.includes('ts')) {
            extensions.push('ts');
        }
    },
    _addTypecheckMiddleware(app) {
        let workerPromise = this._getTypecheckWorker();
        let middleware = new middleware_1.default(this.project, workerPromise);
        middleware.register(app);
    },
    _typecheckWorker: undefined,
    _getTypecheckWorker() {
        if (!this._typecheckWorker) {
            this._typecheckWorker = this._forkTypecheckWorker();
        }
        return this._typecheckWorker;
    },
    _forkTypecheckWorker() {
        return __awaiter(this, void 0, void 0, function* () {
            let childProcess = fork_1.default(`${__dirname}/lib/typechecking/worker/launch`);
            let worker = yield child_process_1.connect(childProcess);
            yield worker.onTypecheck(status => {
                for (let error of status.errors) {
                    this.ui.writeLine(error);
                }
            });
            yield worker.start(this.project.root);
            return worker;
        });
    },
});
