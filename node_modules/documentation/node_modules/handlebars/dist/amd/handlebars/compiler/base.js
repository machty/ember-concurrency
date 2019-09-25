define(['exports', './parser', './ast', './whitespace-control', './helpers', '../utils'], function (exports, _parser, _ast, _whitespaceControl, _helpers, _utils) {
  'use strict';

  exports.__esModule = true;
  exports.parse = parse;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _parser2 = _interopRequireDefault(_parser);

  var _AST = _interopRequireDefault(_ast);

  var _WhitespaceControl = _interopRequireDefault(_whitespaceControl);

  exports.parser = _parser2['default'];

  var yy = {};
  _utils.extend(yy, _helpers, _AST['default']);

  function parse(input, options) {
    // Just return if an already-compiled AST was passed in.
    if (input.type === 'Program') {
      return input;
    }

    _parser2['default'].yy = yy;

    // Altering the shared object here, but this is ok as parser is a sync operation
    yy.locInfo = function (locInfo) {
      return new yy.SourceLocation(options && options.srcName, locInfo);
    };

    var strip = new _WhitespaceControl['default']();
    return strip.accept(_parser2['default'].parse(input));
  }
});
