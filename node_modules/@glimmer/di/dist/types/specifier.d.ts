export interface Specifier {
    rootName?: string;
    collection?: string;
    namespace?: string;
    name?: string;
    type?: string;
}
export declare function isSpecifierStringAbsolute(specifier: string): boolean;
export declare function isSpecifierObjectAbsolute(specifier: Specifier): boolean;
export declare function serializeSpecifier(specifier: Specifier): string;
export declare function serializeSpecifierPath(specifier: Specifier): string;
export declare function deserializeSpecifier(specifier: string): Specifier;
