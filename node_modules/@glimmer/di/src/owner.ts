import { RegistrationOptions } from './registry';
import { Factory } from './factory';

// TODO - use symbol
export const OWNER = '__owner__';

export function getOwner(object: object): Owner {
  return object[OWNER];
}

export function setOwner(object: object, owner: Owner): void {
  object[OWNER] = owner;
}

export interface Owner {
  identify(specifier: string, referrer?: string): string;

  factoryFor(specifier: string, referrer?: string): Factory<any>;
  
  lookup(specifier: string, referrer?: string): any;
}
