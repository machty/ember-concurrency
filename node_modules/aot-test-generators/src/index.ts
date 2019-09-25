import TestGenerator from './test-generator';
import QUnitTestGenerator from './qunit';
import MochaTestGenerator from './mocha';

let qunit = new QUnitTestGenerator();
let mocha = new MochaTestGenerator();

let generators: { [name: string]: TestGenerator } = { qunit, mocha };

module.exports = generators;
