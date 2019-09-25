'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = require('@glimmer/util');

// ensure stays in sync with typing
// ParentNode and ChildKey types are derived from VisitorKeysMap
var visitorKeys = {
    Program: (0, _util.tuple)('body'),
    Template: (0, _util.tuple)('body'),
    Block: (0, _util.tuple)('body'),
    MustacheStatement: (0, _util.tuple)('path', 'params', 'hash'),
    BlockStatement: (0, _util.tuple)('path', 'params', 'hash', 'program', 'inverse'),
    ElementModifierStatement: (0, _util.tuple)('path', 'params', 'hash'),
    PartialStatement: (0, _util.tuple)('name', 'params', 'hash'),
    CommentStatement: (0, _util.tuple)(),
    MustacheCommentStatement: (0, _util.tuple)(),
    ElementNode: (0, _util.tuple)('attributes', 'modifiers', 'children', 'comments'),
    AttrNode: (0, _util.tuple)('value'),
    TextNode: (0, _util.tuple)(),
    ConcatStatement: (0, _util.tuple)('parts'),
    SubExpression: (0, _util.tuple)('path', 'params', 'hash'),
    PathExpression: (0, _util.tuple)(),
    StringLiteral: (0, _util.tuple)(),
    BooleanLiteral: (0, _util.tuple)(),
    NumberLiteral: (0, _util.tuple)(),
    NullLiteral: (0, _util.tuple)(),
    UndefinedLiteral: (0, _util.tuple)(),
    Hash: (0, _util.tuple)('pairs'),
    HashPair: (0, _util.tuple)('value')
};
exports.default = visitorKeys;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3N5bnRheC9saWIvdHlwZXMvdmlzaXRvci1rZXlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0E7QUFDQTtBQUNBLElBQU0sY0FBYztBQUNsQixhQUFTLGlCQURTLE1BQ1QsQ0FEUztBQUVsQixjQUFVLGlCQUZRLE1BRVIsQ0FGUTtBQUdsQixXQUFPLGlCQUhXLE1BR1gsQ0FIVztBQUtsQix1QkFBbUIsaUJBQUEsTUFBQSxFQUFBLFFBQUEsRUFMRCxNQUtDLENBTEQ7QUFNbEIsb0JBQWdCLGlCQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsTUFBQSxFQUFBLFNBQUEsRUFORSxTQU1GLENBTkU7QUFPbEIsOEJBQTBCLGlCQUFBLE1BQUEsRUFBQSxRQUFBLEVBUFIsTUFPUSxDQVBSO0FBUWxCLHNCQUFrQixpQkFBQSxNQUFBLEVBQUEsUUFBQSxFQVJBLE1BUUEsQ0FSQTtBQVNsQixzQkFUa0Isa0JBQUE7QUFVbEIsOEJBVmtCLGtCQUFBO0FBV2xCLGlCQUFhLGlCQUFBLFlBQUEsRUFBQSxXQUFBLEVBQUEsVUFBQSxFQVhLLFVBV0wsQ0FYSztBQVlsQixjQUFVLGlCQVpRLE9BWVIsQ0FaUTtBQWFsQixjQWJrQixrQkFBQTtBQWVsQixxQkFBaUIsaUJBZkMsT0FlRCxDQWZDO0FBZ0JsQixtQkFBZSxpQkFBQSxNQUFBLEVBQUEsUUFBQSxFQWhCRyxNQWdCSCxDQWhCRztBQWlCbEIsb0JBakJrQixrQkFBQTtBQW1CbEIsbUJBbkJrQixrQkFBQTtBQW9CbEIsb0JBcEJrQixrQkFBQTtBQXFCbEIsbUJBckJrQixrQkFBQTtBQXNCbEIsaUJBdEJrQixrQkFBQTtBQXVCbEIsc0JBdkJrQixrQkFBQTtBQXlCbEIsVUFBTSxpQkF6QlksT0F5QlosQ0F6Qlk7QUEwQmxCLGNBQVUsaUJBQUEsT0FBQTtBQTFCUSxDQUFwQjtrQkFrQ0EsVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR1cGxlIH0gZnJvbSAnQGdsaW1tZXIvdXRpbCc7XG5pbXBvcnQgKiBhcyBBU1QgZnJvbSAnLi4vdHlwZXMvbm9kZXMnO1xuXG4vLyBlbnN1cmUgc3RheXMgaW4gc3luYyB3aXRoIHR5cGluZ1xuLy8gUGFyZW50Tm9kZSBhbmQgQ2hpbGRLZXkgdHlwZXMgYXJlIGRlcml2ZWQgZnJvbSBWaXNpdG9yS2V5c01hcFxuY29uc3QgdmlzaXRvcktleXMgPSB7XG4gIFByb2dyYW06IHR1cGxlKCdib2R5JyksXG4gIFRlbXBsYXRlOiB0dXBsZSgnYm9keScpLFxuICBCbG9jazogdHVwbGUoJ2JvZHknKSxcblxuICBNdXN0YWNoZVN0YXRlbWVudDogdHVwbGUoJ3BhdGgnLCAncGFyYW1zJywgJ2hhc2gnKSxcbiAgQmxvY2tTdGF0ZW1lbnQ6IHR1cGxlKCdwYXRoJywgJ3BhcmFtcycsICdoYXNoJywgJ3Byb2dyYW0nLCAnaW52ZXJzZScpLFxuICBFbGVtZW50TW9kaWZpZXJTdGF0ZW1lbnQ6IHR1cGxlKCdwYXRoJywgJ3BhcmFtcycsICdoYXNoJyksXG4gIFBhcnRpYWxTdGF0ZW1lbnQ6IHR1cGxlKCduYW1lJywgJ3BhcmFtcycsICdoYXNoJyksXG4gIENvbW1lbnRTdGF0ZW1lbnQ6IHR1cGxlKCksXG4gIE11c3RhY2hlQ29tbWVudFN0YXRlbWVudDogdHVwbGUoKSxcbiAgRWxlbWVudE5vZGU6IHR1cGxlKCdhdHRyaWJ1dGVzJywgJ21vZGlmaWVycycsICdjaGlsZHJlbicsICdjb21tZW50cycpLFxuICBBdHRyTm9kZTogdHVwbGUoJ3ZhbHVlJyksXG4gIFRleHROb2RlOiB0dXBsZSgpLFxuXG4gIENvbmNhdFN0YXRlbWVudDogdHVwbGUoJ3BhcnRzJyksXG4gIFN1YkV4cHJlc3Npb246IHR1cGxlKCdwYXRoJywgJ3BhcmFtcycsICdoYXNoJyksXG4gIFBhdGhFeHByZXNzaW9uOiB0dXBsZSgpLFxuXG4gIFN0cmluZ0xpdGVyYWw6IHR1cGxlKCksXG4gIEJvb2xlYW5MaXRlcmFsOiB0dXBsZSgpLFxuICBOdW1iZXJMaXRlcmFsOiB0dXBsZSgpLFxuICBOdWxsTGl0ZXJhbDogdHVwbGUoKSxcbiAgVW5kZWZpbmVkTGl0ZXJhbDogdHVwbGUoKSxcblxuICBIYXNoOiB0dXBsZSgncGFpcnMnKSxcbiAgSGFzaFBhaXI6IHR1cGxlKCd2YWx1ZScpLFxufTtcblxudHlwZSBWaXNpdG9yS2V5c01hcCA9IHR5cGVvZiB2aXNpdG9yS2V5cztcblxuZXhwb3J0IHR5cGUgVmlzaXRvcktleXMgPSB7IFtQIGluIGtleW9mIFZpc2l0b3JLZXlzTWFwXTogVmlzaXRvcktleXNNYXBbUF1bbnVtYmVyXSB9O1xuZXhwb3J0IHR5cGUgVmlzaXRvcktleTxOIGV4dGVuZHMgQVNULk5vZGU+ID0gVmlzaXRvcktleXNbTlsndHlwZSddXSAmIGtleW9mIE47XG5cbmV4cG9ydCBkZWZhdWx0IHZpc2l0b3JLZXlzO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==