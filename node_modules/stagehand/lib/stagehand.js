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
const function_handle_registry_1 = __importDefault(require("./function-handle-registry"));
const command_coordinator_1 = __importDefault(require("./command-coordinator"));
class Stagehand {
    constructor(implementation) {
        this.rehydrateRemoteFunction = (handleID) => {
            return (...params) => {
                if (!this.commandCoordinator) {
                    throw new Error('Cannot call function through a disconnected stagehand');
                }
                return this.commandCoordinator.sendCommand('call', handleID, params);
            };
        };
        this.executor = {
            call: (name, args) => {
                let thisValue;
                let fun;
                if (typeof name === 'string') {
                    fun = this.implementation && this.implementation[name];
                    thisValue = this.implementation;
                }
                else {
                    fun = this.handleRegistry.lookupFunction(name);
                    thisValue = null;
                }
                if (typeof fun !== 'function') {
                    throw new Error('Unable to call a nonexistent or non-function field ');
                }
                return fun.apply(thisValue, args);
            },
            handshake: () => {
                if (!this.implementation) {
                    return { name: 'void', methods: [] };
                }
                let name = this.implementation.constructor.name;
                let methods = [];
                let object = this.implementation;
                while (object && object !== Object.prototype) {
                    for (let key of Object.getOwnPropertyNames(object)) {
                        if (typeof this.implementation[key] === 'function' && key !== 'constructor') {
                            methods.push(key);
                        }
                    }
                    object = Object.getPrototypeOf(object);
                }
                return { name, methods };
            },
            disconnect: () => {
                setTimeout(() => this.shutdown());
            }
        };
        this.implementation = implementation;
        this.handleRegistry = new function_handle_registry_1.default(this.rehydrateRemoteFunction);
    }
    isConnected() {
        return !!this.commandCoordinator;
    }
    listen(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.startup(endpoint);
        });
    }
    connect(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.startup(endpoint);
            return this.commandCoordinator.sendCommand('handshake');
        });
    }
    call(method, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.commandCoordinator) {
                throw new Error('Stagehand is disconnected');
            }
            return this.commandCoordinator.sendCommand('call', method, args);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.commandCoordinator) {
                yield this.commandCoordinator.sendCommand('disconnect');
            }
            this.shutdown();
        });
    }
    startup(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.disconnect();
            this.endpoint = endpoint;
            this.commandCoordinator = new command_coordinator_1.default(endpoint, this.handleRegistry, this.executor);
        });
    }
    shutdown() {
        this.handleRegistry.reset();
        this.commandCoordinator = undefined;
        if (this.endpoint) {
            this.endpoint.disconnect();
        }
    }
}
exports.default = Stagehand;
