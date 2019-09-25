'use strict';
const fs = require('fs');
const path = require('path');
const APP_DECLARATIONS = `import Ember from 'ember';

declare global {
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}
  // interface Function extends Ember.FunctionPrototypeExtensions {}
}

export {};`;
/**
 * @param {string} projectName
 * @param {'classic' | 'pods' | 'mu'} layout
 */
function buildTemplateDeclarations(projectName, layout) {
    const comment = '// Types for compiled templates';
    const moduleBody = `
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
`;
    switch (layout) {
        case 'classic': return `${comment}
declare module '${projectName}/templates/*' { ${moduleBody}}`;
        case 'pods': return `${comment}
declare module '${projectName}/*/template' { ${moduleBody}}`;
        case 'mu': return `${comment}
declare module '${projectName}/ui/components/*/template' { ${moduleBody}}`;
        default: throw new Error(`Unexpecte project layout type: "${layout}"`);
    }
}
module.exports = {
    APP_DECLARATIONS,
    description: 'Initialize files needed for typescript compilation',
    install(options) {
        if (options.project.isEmberCLIAddon()) {
            options.dummy = true;
        }
        return this._super.install.apply(this, arguments);
    },
    locals() {
        let inRepoAddons = (this.project.pkg['ember-addon'] || {}).paths || [];
        let hasMirage = 'ember-cli-mirage' in (this.project.pkg.devDependencies || {});
        let isAddon = this.project.isEmberCLIAddon();
        let isMU = this._detectMU();
        let includes = isMU ? ['src'] : ['app', isAddon && 'addon'].filter(Boolean);
        const isPods = this.pod;
        includes = includes.concat(['tests', 'types']).concat(inRepoAddons);
        if (isAddon && !isMU) {
            includes.push('test-support', 'addon-test-support');
        }
        // Mirage is already covered for addons because it's under `tests/`
        if (hasMirage && !isAddon) {
            includes.push('mirage');
        }
        return {
            includes: JSON.stringify(includes.map(include => `${include}/**/*`), null, 2).replace(/\n/g, '\n  '),
            pathsFor: dasherizedName => {
                // We need to wait to use this module until `ember-cli-typescript-blueprints` has been installed
                let updatePathsForAddon = require('ember-cli-typescript-blueprints/lib/utilities/update-paths-for-addon');
                let appName = isAddon ? 'dummy' : dasherizedName;
                let paths = {
                    [`${appName}/tests/*`]: ['tests/*'],
                };
                if (hasMirage) {
                    paths[`${appName}/mirage/*`] = [`${isAddon ? 'tests/dummy/' : ''}mirage/*`];
                }
                if (isMU) {
                    if (isAddon) {
                        paths[`${appName}/src/*`] = ['tests/dummy/src/*'];
                        paths[`${dasherizedName}/src/*`] = ['src/*'];
                    }
                    else {
                        paths[`${appName}/src/*`] = ['src/*'];
                    }
                }
                else {
                    if (isAddon) {
                        paths[`${appName}/*`] = ['tests/dummy/app/*', 'app/*'];
                    }
                    else {
                        paths[`${appName}/*`] = ['app/*'];
                    }
                    if (isAddon) {
                        paths[dasherizedName] = ['addon'];
                        paths[`${dasherizedName}/*`] = ['addon/*'];
                        paths[`${dasherizedName}/test-support`] = ['addon-test-support'];
                        paths[`${dasherizedName}/test-support/*`] = ['addon-test-support/*'];
                    }
                }
                for (let addon of inRepoAddons) {
                    updatePathsForAddon(paths, path.basename(addon), appName);
                }
                paths['*'] = ['types/*'];
                return JSON.stringify(paths, null, 2).replace(/\n/g, '\n    ');
            },
            indexDeclarations: dasherizedName => {
                const isDummyApp = dasherizedName === 'dummy';
                const useAppDeclarations = !(isAddon || isDummyApp);
                return useAppDeclarations ? APP_DECLARATIONS : '';
            },
            globalDeclarations: dasherizedName => {
                /** @type {'classic' | 'pods' | 'mu'} */
                let projectLayout;
                if (isPods)
                    projectLayout = 'pods';
                else if (isMU)
                    projectLayout = 'mu';
                else
                    projectLayout = 'classic';
                return buildTemplateDeclarations(dasherizedName, projectLayout);
            }
        };
    },
    fileMapTokens( /*options*/) {
        let isMU = this._detectMU();
        // Return custom tokens to be replaced in your files.
        return {
            __app_name__(options) {
                return options.inAddon ? 'dummy' : options.dasherizedModuleName;
            },
            __config_root__(options) {
                if (isMU) {
                    return options.inAddon ? 'tests/dummy' : '.';
                }
                else {
                    return options.inAddon ? 'tests/dummy/app' : 'app';
                }
            }
        };
    },
    normalizeEntityName() {
        // Entity name is optional right now, creating this hook avoids an error.
    },
    beforeInstall() {
        if (this.project.isEmberCLIAddon()) {
            this._installPrecompilationHooks();
        }
        let packages = [
            { name: 'ember-cli-typescript-blueprints', target: 'latest' },
            { name: 'typescript', target: 'latest' },
            { name: '@types/ember', target: 'latest' },
            { name: '@types/rsvp', target: 'latest' },
            { name: '@types/ember-test-helpers', target: 'latest' },
            { name: '@types/ember-testing-helpers', target: 'latest' },
            { name: '@types/ember__test-helpers', target: 'latest' },
        ];
        if (this._has('ember-data')) {
            packages.push({ name: '@types/ember-data', target: 'latest' });
        }
        if (this._has('ember-cli-qunit') || this._has('ember-qunit')) {
            packages = packages.concat([
                { name: '@types/ember-qunit', target: 'latest' },
                { name: '@types/qunit', target: 'latest' },
            ]);
        }
        if (this._has('ember-cli-mocha') || this._has('ember-mocha')) {
            packages = packages.concat([
                { name: '@types/ember-mocha', target: 'latest' },
                { name: '@types/mocha', target: 'latest' },
            ]);
        }
        return this.addPackagesToProject(packages);
    },
    filesPath() {
        return `${__dirname}/../../../blueprint-files/ember-cli-typescript`;
    },
    files() {
        let files = this._super.files.apply(this, arguments);
        if (!this._has('ember-data')) {
            files = files.filter(file => file !== 'types/ember-data/types/registries/model.d.ts');
        }
        return files;
    },
    _detectMU() {
        return this.project.isModuleUnification && this.project.isModuleUnification();
    },
    _installPrecompilationHooks() {
        let pkgPath = `${this.project.root}/package.json`;
        let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        // Really `prepack` and `postpack` would be ideal, but yarn doesn't execute those when publishing
        this._addScript(pkg.scripts, 'prepublishOnly', 'ember ts:precompile');
        this._addScript(pkg.scripts, 'postpublish', 'ember ts:clean');
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    },
    _addScript(scripts, type, script) {
        if (scripts[type] && scripts[type] !== script) {
            this.ui.writeWarnLine(`Found a pre-existing \`${type}\` script in your package.json. ` +
                `By default, ember-cli-typescripts expects to run \`${script}\` in this hook.`);
            return;
        }
        scripts[type] = script;
    },
    _has(pkg) {
        if (this.project) {
            return pkg in this.project.dependencies();
        }
    },
};
