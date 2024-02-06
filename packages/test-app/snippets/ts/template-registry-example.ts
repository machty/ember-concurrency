// e.g. types/glint.d.ts
import '@glint/environment-ember-loose';
import type EmberConcurrencyRegistry from 'ember-concurrency/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberConcurrencyRegistry /* other addon registries */ {
    // local entries
  }
}
