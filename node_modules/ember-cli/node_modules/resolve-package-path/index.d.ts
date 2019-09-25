import CacheGroup = require('./lib/cache-group');
export = resolvePackagePath;
declare function resolvePackagePath(target: string, basedir: string, _cache?: CacheGroup | boolean): string | null;
declare namespace resolvePackagePath {
    var _resetCache: () => void;
    var getRealFilePath: (filePath: string) => any;
    var getRealDirectoryPath: (directoryhPath: string) => any;
}
declare module resolvePackagePath {
    let _CACHE: CacheGroup;
}
