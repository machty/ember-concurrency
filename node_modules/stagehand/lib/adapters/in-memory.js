"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function connectLocal(handler) {
    return __awaiter(this, void 0, void 0, function* () {
        let [one, two] = endpointPair();
        __1.launch(one, handler);
        return __1.connect(two);
    });
}
exports.connectLocal = connectLocal;
function endpointPair() {
    let one = new InMemoryEndpoint();
    let two = new InMemoryEndpoint();
    one.connect(two);
    two.connect(one);
    return [one, two];
}
exports.endpointPair = endpointPair;
class InMemoryEndpoint {
    constructor() {
        this.listeners = [];
    }
    connect(other) {
        this.other = other;
    }
    onMessage(callback) {
        this.listeners.push(callback);
    }
    sendMessage(message) {
        if (this.other) {
            this.other.dispatchMessage(message);
        }
    }
    disconnect() {
        this.other = undefined;
        this.listeners = [];
    }
    dispatchMessage(message) {
        for (let listener of this.listeners) {
            listener(message);
        }
    }
}
