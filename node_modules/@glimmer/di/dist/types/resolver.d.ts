import { FactoryDefinition } from './factory';
export interface Resolver {
    identify(specifier: string, referrer?: string): string;
    retrieve(specifier: string): FactoryDefinition<any>;
}
