"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function launch(handler, options) {
    return __1.launch(endpointForParentProcess(), handler, options);
}
exports.launch = launch;
function connect(child, options) {
    return __1.connect(endpointForChildProcess(child), options);
}
exports.connect = connect;
function endpointForParentProcess() {
    if (!process.send) {
        throw new Error('`endpointForParentProcess` is only available in node processes that were `fork`ed from a parent.');
    }
    return {
        addListener: callback => process.addListener('message', callback),
        removeListener: callback => process.removeListener('message', callback),
        send: message => process.send(message),
        disconnect: () => process.disconnect()
    };
}
exports.endpointForParentProcess = endpointForParentProcess;
function endpointForChildProcess(child) {
    return {
        addListener: callback => child.addListener('message', callback),
        removeListener: callback => child.removeListener('message', callback),
        send: message => child.send(message),
        disconnect: () => child.disconnect()
    };
}
exports.endpointForChildProcess = endpointForChildProcess;
