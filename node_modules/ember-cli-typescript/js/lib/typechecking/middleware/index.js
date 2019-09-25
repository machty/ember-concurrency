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
const render_error_page_1 = __importDefault(require("./render-error-page"));
exports.LIVE_RELOAD_PATH = '/ember-cli-live-reload.js';
class TypecheckMiddleware {
    constructor(project, workerPromise) {
        this.project = project;
        this.workerPromise = workerPromise;
    }
    register(app) {
        app.use((...params) => this.handleRequest(...params));
    }
    handleRequest(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.accepts('html') || request.path === exports.LIVE_RELOAD_PATH) {
                next();
                return;
            }
            let worker = yield this.workerPromise;
            let { errors, failed } = yield worker.getStatus();
            if (failed) {
                response.type('html');
                response.end(render_error_page_1.default(errors, this.environmentInfo()));
            }
            else {
                next();
            }
        });
    }
    environmentInfo() {
        let tsVersion = this.project.require('typescript/package.json').version;
        let ectsVersion = require(`${__dirname}/../../../../package`).version;
        return `typescript@${tsVersion}, ember-cli-typescript@${ectsVersion}`;
    }
}
exports.default = TypecheckMiddleware;
