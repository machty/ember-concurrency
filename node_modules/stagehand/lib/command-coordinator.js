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
const debug_1 = __importDefault(require("debug"));
const defer_1 = require("./utils/defer");
const debug = debug_1.default('stagehand:command-coordinator');
/**
 * Coordinates command/response pairs across a given `MessageEndpoint`, returning
 * a promise for each outgoing command and dispatching incoming ones to a given
 * executor.
 */
class CommandCoordinator {
    constructor(endpoint, handleRegistry, executor) {
        this.endpoint = endpoint;
        this.handleRegistry = handleRegistry;
        this.executor = executor;
        this.nextSeq = 0;
        this.pendingCommands = new Map();
        this.endpoint.onMessage(this.messageReceived.bind(this));
    }
    sendCommand(name, ...args) {
        let seq = this.nextSeq++;
        let dfd = defer_1.defer();
        let command = { [COMMAND]: seq, name, args: this.handleRegistry.dehydrate(args) };
        this.pendingCommands.set(seq, dfd);
        this.sendMessage(command);
        return dfd.promise;
    }
    messageReceived(message) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('Message received %o', message);
            if (this.isResponse(message)) {
                return this.dispatchResponse(message);
            }
            else if (this.isCommand(message)) {
                return this.dispatchCommand(message);
            }
        });
    }
    dispatchResponse(response) {
        let pending = this.pendingDeferred(response);
        if (pending !== undefined) {
            if (response.error) {
                pending.reject(typeof response.value === 'string' ? new Error(response.value) : response.value);
            }
            else {
                pending.resolve(this.handleRegistry.rehydrate(response.value));
            }
        }
        else {
            debug('Received a response message for an unknown command %o', response);
        }
    }
    dispatchCommand(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = { [RESPONSE]: message[COMMAND], error: false, value: undefined };
            let method = this.executor[message.name];
            try {
                let result = yield method(...this.handleRegistry.rehydrate(message.args));
                response.value = this.handleRegistry.dehydrate(result);
            }
            catch (error) {
                response.error = true;
                response.value = error.message || error;
            }
            this.endpoint.sendMessage(response);
        });
    }
    sendMessage(message) {
        debug('Sending message %o', message);
        this.endpoint.sendMessage(message);
    }
    pendingDeferred(response) {
        return this.pendingCommands.get(response[RESPONSE]);
    }
    isResponse(message) {
        return message && typeof message[RESPONSE] === 'number';
    }
    isCommand(message) {
        return message && typeof message[COMMAND] === 'number';
    }
}
exports.default = CommandCoordinator;
const COMMAND = '--stagehand-command';
const RESPONSE = '--stagehand-response';
