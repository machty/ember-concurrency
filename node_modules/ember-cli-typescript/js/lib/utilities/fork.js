"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChildProcess = __importStar(require("child_process"));
const REGISTER_TS_NODE_PATH = `${__dirname}/../../../register-ts-node`;
function fork(path) {
    let child = ChildProcess.fork(path, [], {
        execArgv: execArgs()
    });
    // Terminate the child when ember-cli shuts down
    process.on('exit', () => child.kill());
    return child;
}
exports.default = fork;
function execArgs() {
    // If we're running in a TypeScript file, we need to register ts-node for the child too
    if (isTypeScript()) {
        return ['-r', REGISTER_TS_NODE_PATH];
    }
    else {
        return [];
    }
}
function isTypeScript() {
    return __filename.endsWith('.ts');
}
