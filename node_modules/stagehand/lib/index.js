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
const stagehand_1 = __importDefault(require("./stagehand"));
const STAGEHAND_INSTANCE = '--stagehand-instance';
/**
 * Given a message endpoint and a backing implementation object, listens for a connection on the
 * given endpoint and responds to commands that come in over it. This function will typically be
 * called in whatever secondary thread/process will be servicing commands from the primary.
 */
function launch(endpoint, implementation) {
    return __awaiter(this, void 0, void 0, function* () {
        let stagehand = new stagehand_1.default(implementation);
        stagehand.listen(endpoint);
        return stagehand;
    });
}
exports.launch = launch;
/**
 * Given a message endpoint (and typically an explicit type parameter indicating the interface of
 * the remote implementation), returns a promise that will resolve when successfully connected to
 * the implementation on the other side of that endpoint.
 *
 * The resulting object will have methods defined on it that correspond to those of the backing
 * implementation, returning a promise for the eventual result of that method.
 */
function connect(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        let stagehand = new stagehand_1.default();
        let { name, methods } = yield stagehand.connect(endpoint);
        class StagehandRemote {
        }
        for (let method of methods) {
            Object.defineProperty(StagehandRemote.prototype, method, {
                value: (...args) => stagehand.call(method, args)
            });
        }
        Object.defineProperty(StagehandRemote.prototype, STAGEHAND_INSTANCE, { value: stagehand });
        Object.defineProperty(StagehandRemote, 'name', { value: `StagehandRemote<${name}>` });
        return new StagehandRemote();
    });
}
exports.connect = connect;
/**
 * Given a remote object (as returned from `connect`), disconnects from the source and closes the connection.
 */
function disconnect(remote) {
    remote[STAGEHAND_INSTANCE].disconnect();
}
exports.disconnect = disconnect;
