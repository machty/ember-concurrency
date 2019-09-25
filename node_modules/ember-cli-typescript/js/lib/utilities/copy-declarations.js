"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const walk_sync_1 = __importDefault(require("walk-sync"));
function copyDeclarations(pathRoots, paths, packageName, destDir) {
    let output = [];
    for (let logicalPath of Object.keys(paths)) {
        let physicalPaths = paths[logicalPath];
        if (logicalPath.startsWith(`${packageName}/`) && logicalPath.indexOf('/*') === logicalPath.length - 2) {
            let subdirectory = logicalPath
                .replace(packageName, '')
                .replace('/*', '')
                .replace(/^\//, '');
            copySubpathDeclarations(output, pathRoots, path_1.default.join(destDir, subdirectory), physicalPaths);
        }
    }
    return output;
}
exports.default = copyDeclarations;
function copySubpathDeclarations(output, pathRoots, destDir, physicalPaths) {
    for (let pathRoot of pathRoots) {
        for (let physicalPath of physicalPaths) {
            if (!physicalPath.endsWith('/*')) {
                throw new Error(`Missing trailing '*' in path mapping: ${physicalPath}`);
            }
            let fullRoot = path_1.default.resolve(pathRoot, physicalPath.replace(/\/\*$/, ''));
            if (!fs_extra_1.default.existsSync(fullRoot)) {
                continue;
            }
            for (let file of walk_sync_1.default(fullRoot, { globs: ['**/*.d.ts'] })) {
                let destinationPath = path_1.default.join(destDir, file);
                if (!fs_extra_1.default.existsSync(destinationPath)) {
                    copyFile(output, path_1.default.join(fullRoot, file), destinationPath);
                }
            }
        }
    }
}
function copyFile(output, source, dest) {
    let segments = dest.split(/\/|\\/);
    // Make (and record the making of) any missing directories
    for (let i = 1; i < segments.length; i++) {
        let dir = segments.slice(0, i).join('/');
        if (dir && !fs_extra_1.default.existsSync(dir)) {
            fs_extra_1.default.mkdirSync(dir);
            output.push(`${dir}/`);
        }
    }
    fs_extra_1.default.writeFileSync(dest, fs_extra_1.default.readFileSync(source));
    output.push(dest);
}
