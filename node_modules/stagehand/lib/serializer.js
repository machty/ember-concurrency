"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Serializer {
    constructor() {
        this.nextFunctionHandle = 0;
        this.handlesByFunction = new Map();
        this.functionsByHandle = new Map();
    }
    dehydrate(root) {
        return walk(root, obj => {
            if (typeof obj === 'function') {
                return functionHandle(this.handleIdFor(obj));
            }
        });
    }
    rehydrate(root, options) {
        return walk(root, obj => {
            if (isFunctionHandle(obj)) {
                return (...params) => options.hydrateFunction(obj, params);
            }
        });
    }
    lookupFunction(handle) {
        return this.functionsByHandle.get(handle[HANDLE_ID]);
    }
    releaseFunction(f) {
        let handle = this.handlesByFunction.get(f);
        if (handle !== undefined) {
            this.functionsByHandle.delete(handle);
        }
        this.handlesByFunction.delete(f);
    }
    handleIdFor(f) {
        let handle = this.handlesByFunction.get(f);
        if (handle === undefined) {
            handle = this.nextFunctionHandle++;
            this.handlesByFunction.set(f, handle);
            this.functionsByHandle.set(handle, f);
        }
        return handle;
    }
}
exports.default = Serializer;
const HANDLE_ID = '--stagehand-function-handle';
function functionHandle(id) {
    return { [HANDLE_ID]: id };
}
function isFunctionHandle(obj) {
    return obj && typeof obj === 'object' && typeof obj[HANDLE_ID] === 'number';
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
            throw new Error('Unable to serialize non-POJO object');
        }
        let result = {};
        for (let key of Object.keys(obj)) {
            result[key] = walk(obj[key], handler);
        }
        return result;
    }
    return obj;
}
