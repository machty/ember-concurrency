import { ModuleRegistry } from '../module-registry';
import { Dict } from '@glimmer/di';

export default class BasicRegistry implements ModuleRegistry {
  private _entries: Dict<any>;

  constructor(entries: Dict<any> = {}) {
    this._entries = entries;
  }

  has(specifier: string): boolean {
    return specifier in this._entries;
  }

  get(specifier: string): any {
    return this._entries[specifier];
  }
}
