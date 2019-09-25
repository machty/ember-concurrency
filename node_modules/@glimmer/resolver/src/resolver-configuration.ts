import { Dict } from '@glimmer/di';

export interface PackageDefinition {
  /**
   * The name of the package, as defined in `package.json`.
   *
   * For example, a package published to npm as `ember-super-input` must
   * also use this `name`.
   */
  name: string;

  /**
   * The path to the directory that contains the `main` export for the
   * package.
   *
   * By default, `mainPath = '/src'`.
   */
  mainPath?: string;

  /**
   * An alias used for module resolution.
   *
   * For addons, the `rootName` will initially be a read-only property that
   * equals the package `name` with any `ember-` and `ember-cli-` prefixes
   * stripped. (e.g. `ember-super-input` becomes `super-input`). It's
   * possible that custom overrides / aliases will be allowed in the future.
   *
   * All apps should use a `rootName` of "app" for consistency.
   */
  rootName?: string;
}

export interface ModuleTypeDefinition {
  definitiveCollection?: string;
  unresolvable?: boolean;
}

export interface ModuleCollectionDefinition {
  group?: string;
  types?: string[];
  defaultType?: string;
  privateCollections?: string[];
  unresolvable?: boolean;
}

export interface ResolverConfiguration {
  app?: PackageDefinition;
  types: Dict<ModuleTypeDefinition>;
  collections: Dict<ModuleCollectionDefinition>;
}
