"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HANDLE_KEY = '--stagehand-function-handle';
class FunctionHandleRegistry {
    constructor(hydrateRemoteFunction) {
        this.hydrateRemoteFunction = hydrateRemoteFunction;
        this.nextFunctionHandle = 0;
        this.handlesByFunction = new Map();
        this.functionsByHandle = new Map();
    }
    dehydrate(root) {
        return walk(root, obj => {
            if (typeof obj === 'function') {
                return dehydrateHandle(this.lookupOrGenerateHandle(obj));
            }
        });
    }
    rehydrate(root) {
        return walk(root, obj => {
            if (isDehydratedHandle(obj)) {
                return this.hydrateRemoteFunction(obj[HANDLE_KEY]);
            }
        });
    }
    lookupFunction(handle) {
        return this.functionsByHandle.get(handle);
    }
    lookupHandle(f) {
        return this.handlesByFunction.get(f);
    }
    releaseFunction(f) {
        let handle = this.handlesByFunction.get(f);
        if (handle !== undefined) {
            this.functionsByHandle.delete(handle);
        }
        this.handlesByFunction.delete(f);
    }
    reset() {
        this.handlesByFunction.clear();
        this.functionsByHandle.clear();
    }
    lookupOrGenerateHandle(f) {
        let handle = this.lookupHandle(f);
        if (handle === undefined) {
            handle = this.generateHAndle();
            this.handlesByFunction.set(f, handle);
            this.functionsByHandle.set(handle, f);
        }
        return handle;
    }
    generateHAndle() {
        return this.nextFunctionHandle++;
    }
}
exports.default = FunctionHandleRegistry;
function dehydrateHandle(handle) {
    return { [HANDLE_KEY]: handle };
}
function isHandle(maybeHandle) {
    return typeof maybeHandle === 'number';
}
function isDehydratedHandle(obj) {
    return obj && typeof obj === 'object' && isHandle(obj[HANDLE_KEY]);
}
function walk(obj, handler) {
    let result = handler(obj);
    if (result !== undefined) {
        return result;
    }
    if (Array.isArray(obj)) {
        return obj.map(el => walk(el, handler));
    }
    if (typeof obj === 'object' && obj) {
        if (Object.getPrototypeOf(obj) !== Object.prototype) {
            return obj;
        }
        let result = {};
        for (let key of Object.keys(obj)) {
            result[key] = walk(obj[key], handler);
        }
        return result;
    }
    return obj;
}
