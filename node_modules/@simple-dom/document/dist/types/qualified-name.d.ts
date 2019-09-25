export declare type Prefix = string | null;
export declare type LocalName = string;
export declare type QualifiedName = [Prefix, LocalName];
export declare function parseQualifiedName(qualifiedName: string): QualifiedName;
