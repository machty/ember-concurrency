"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function launch(handler) {
    return __1.launch(endpointForParentProcess(), handler);
}
exports.launch = launch;
function connect(child) {
    return __1.connect(endpointForChildProcess(child));
}
exports.connect = connect;
function endpointForParentProcess() {
    if (!process || !process.send) {
        throw new Error('`endpointForParentProcess` is only available in processes resulting from a fork() call');
    }
    return {
        onMessage: callback => process.addListener('message', callback),
        sendMessage: message => process.send(message),
        disconnect: () => {
            if (process.connected) {
                process.disconnect();
            }
        }
    };
}
exports.endpointForParentProcess = endpointForParentProcess;
function endpointForChildProcess(child) {
    return {
        onMessage: callback => child.addListener('message', callback),
        sendMessage: message => child.send(message),
        disconnect: () => {
            if (child.connected) {
                child.disconnect();
            }
        }
    };
}
exports.endpointForChildProcess = endpointForChildProcess;
