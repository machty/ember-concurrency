"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defer() {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
exports.defer = defer;
