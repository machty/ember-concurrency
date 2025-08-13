import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import { loadTests } from 'ember-qunit/test-loader';
import QUnit from 'qunit';
import { setup as setupQUnitDom } from 'qunit-dom';
import Application from 'test-app/app';
import config from 'test-app/config/environment';

setupQUnitDom(QUnit.assert);

QUnit.config.testTimeout = 5000;

setApplication(Application.create(config.APP));
loadTests();

start();
