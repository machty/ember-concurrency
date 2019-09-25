'use strict';

const fs = require('fs');
const path = require('path');

const handlebars = require('handlebars');
const errorTemplate = handlebars.compile(fs.readFileSync(path.resolve(__dirname, '..', 'templates/error.html')).toString());
const errorHandlerUtils = require('./error-handler-utils');

const toVersionString = errorHandlerUtils.toVersionString;

const hasAnsi = require('has-ansi');
const ansiHTML = require('ansi-html');
// Resets foreground and background colors to black
// and white respectively
ansiHTML.setColors({
  reset: ['#000', '#fff'],
});

module.exports = function errorHandler(response, options) {
  // All errors thrown from builder.build() are guaranteed to be
  // Builder.BuildError instances.
  const buildError = options.buildError;
  const broccoliPayload = buildError.broccoliPayload;
  const broccoliNode = broccoliPayload.broccoliNode || {};
  const versions = broccoliPayload.versions || {};

  const versionString = toVersionString(versions);

  const context = {
    stack: ansiHTML(broccoliPayload.error.stack),
    broccoliBuilderErrorStack: ansiHTML(buildError.stack),
    instantiationStack: ansiHTML(broccoliPayload.instantiationStack),
    errorMessage: ansiHTML(buildError.message),
    liveReloadPath: options.liveReloadPath,
    codeFrame: ansiHTML(broccoliPayload.error.codeFrame),
    nodeName: broccoliNode.nodeName,
    nodeAnnotation: broccoliNode.nodeAnnotation,
    errorType: broccoliPayload.error.errorType,
    location: broccoliPayload.error.location,
    hasAnsi: hasAnsi(broccoliPayload.error.stack),
    versionString
  };
  response.setHeader('Content-Type', 'text/html');
  response.writeHead(500);
  response.end(errorTemplate(context));
}
