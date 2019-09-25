import { Maybe, SymbolDestroyable, Destroyable, DestroySymbol, Dict } from '@glimmer/interfaces';
export declare const DESTROY: DestroySymbol;
export declare function isDestroyable(value: Maybe<Dict>): value is SymbolDestroyable;
export declare function isStringDestroyable(value: Maybe<Partial<Destroyable>>): value is Destroyable;
//# sourceMappingURL=destroy.d.ts.map