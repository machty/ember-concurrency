export declare function toArray<K extends keyof HTMLElementTagNameMap>(selectors: NodeListOf<HTMLElementTagNameMap[K]>): HTMLElementTagNameMap[K][];
export declare function toArray<K extends keyof SVGElementTagNameMap>(selectors: NodeListOf<SVGElementTagNameMap[K]>): SVGElementTagNameMap[K][];
export declare function toArray<E extends Element = Element>(selectors: NodeListOf<E>): E[];
export declare function toArray(list: NodeList): Node[];
