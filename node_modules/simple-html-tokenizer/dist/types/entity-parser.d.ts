import { NamedEntityMap } from './types';
export default class EntityParser {
    private named;
    constructor(named: NamedEntityMap);
    parse(entity: string): string | undefined;
}
