"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function launch(implementation) {
    return __1.launch(endpointForParent(), implementation);
}
exports.launch = launch;
function connect(worker) {
    return __1.connect(endpointForWorker(worker));
}
exports.connect = connect;
function endpointForWorker(worker) {
    return {
        onMessage: callback => worker.addEventListener('message', event => callback(event.data)),
        sendMessage: message => worker.postMessage(message),
        disconnect: () => worker.terminate()
    };
}
exports.endpointForWorker = endpointForWorker;
function endpointForParent() {
    return {
        onMessage: callback => addEventListener('message', event => callback(event.data)),
        sendMessage: message => postMessage(message),
        disconnect: () => close()
    };
}
exports.endpointForParent = endpointForParent;
