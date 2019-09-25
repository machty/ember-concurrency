import { FactoryDefinition } from './factory';
export interface RegistrationOptions {
    singleton?: boolean;
    instantiate?: boolean;
}
export interface Injection {
    property: string;
    source: string;
}
export interface RegistryWriter {
    register(specifier: string, factory: any, options?: RegistrationOptions): void;
    unregister(specifier: string): void;
    registerOption(specifier: string, option: string, value: any): void;
    unregisterOption(specifier: string, option: string): void;
    registerInjection(specifier: string, property: string, source: string): void;
}
export interface RegistryReader {
    registration(specifier: string): any;
    registeredOption(specifier: string, option: string): any;
    registeredOptions(specifier: string): any;
    registeredInjections(specifier: string): Injection[];
}
export interface RegistryOptions {
    fallback?: RegistryReader;
}
export interface RegistryAccessor extends RegistryReader, RegistryWriter {
}
export default class Registry implements RegistryAccessor {
    private _registrations;
    private _registeredOptions;
    private _registeredInjections;
    private _fallback;
    constructor(options?: RegistryOptions);
    register(specifier: string, factoryDefinition: FactoryDefinition<any>, options?: RegistrationOptions): void;
    registration(specifier: string): FactoryDefinition<any>;
    unregister(specifier: string): void;
    registerOption(specifier: string, option: string, value: any): void;
    registeredOption(specifier: string, option: string): any;
    registeredOptions(specifier: string): any;
    unregisterOption(specifier: string, option: string): void;
    registerInjection(specifier: string, property: string, source: string): void;
    registeredInjections(specifier: string): Injection[];
}
