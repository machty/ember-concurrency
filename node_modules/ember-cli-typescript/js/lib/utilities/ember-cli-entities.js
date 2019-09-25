"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * This module contains identity functions that accept and return config
 * hashes for various Ember CLI entities, ensuring that they're compatible
 * with the expected config signature and that any methods have the correct
 * `this` type.
 */
/** Configuration for defining an Ember CLI addon */
function addon(options) {
    return options;
}
exports.addon = addon;
/** Configuration for defining an Ember CLI command */
function command(options) {
    return options;
}
exports.command = command;
