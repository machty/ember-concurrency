"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Parser = undefined;

var _simpleHtmlTokenizer = require("simple-html-tokenizer");

var _util = require("@glimmer/util");

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Parser = exports.Parser = function () {
    function Parser(source) {
        var entityParser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _simpleHtmlTokenizer.EntityParser(_simpleHtmlTokenizer.HTML5NamedCharRefs);

        _classCallCheck(this, Parser);

        this.elementStack = [];
        this.currentAttribute = null;
        this.currentNode = null;
        this.source = source.split(/(?:\r\n?|\n)/g);
        this.tokenizer = new _simpleHtmlTokenizer.EventedTokenizer(this, entityParser);
    }

    Parser.prototype.acceptTemplate = function acceptTemplate(node) {
        return this[node.type](node);
    };

    Parser.prototype.acceptNode = function acceptNode(node) {
        return this[node.type](node);
    };

    Parser.prototype.currentElement = function currentElement() {
        return this.elementStack[this.elementStack.length - 1];
    };

    Parser.prototype.sourceForNode = function sourceForNode(node, endNode) {
        var firstLine = node.loc.start.line - 1;
        var currentLine = firstLine - 1;
        var firstColumn = node.loc.start.column;
        var string = [];
        var line = void 0;
        var lastLine = void 0;
        var lastColumn = void 0;
        if (endNode) {
            lastLine = endNode.loc.end.line - 1;
            lastColumn = endNode.loc.end.column;
        } else {
            lastLine = node.loc.end.line - 1;
            lastColumn = node.loc.end.column;
        }
        while (currentLine < lastLine) {
            currentLine++;
            line = this.source[currentLine];
            if (currentLine === firstLine) {
                if (firstLine === lastLine) {
                    string.push(line.slice(firstColumn, lastColumn));
                } else {
                    string.push(line.slice(firstColumn));
                }
            } else if (currentLine === lastLine) {
                string.push(line.slice(0, lastColumn));
            } else {
                string.push(line);
            }
        }
        return string.join('\n');
    };

    _createClass(Parser, [{
        key: 'currentAttr',
        get: function get() {
            return this.currentAttribute;
        }
    }, {
        key: 'currentTag',
        get: function get() {
            var node = this.currentNode;
            false && (0, _util.assert)(node && (node.type === 'StartTag' || node.type === 'EndTag'), 'expected tag');

            return node;
        }
    }, {
        key: 'currentStartTag',
        get: function get() {
            var node = this.currentNode;
            false && (0, _util.assert)(node && node.type === 'StartTag', 'expected start tag');

            return node;
        }
    }, {
        key: 'currentEndTag',
        get: function get() {
            var node = this.currentNode;
            false && (0, _util.assert)(node && node.type === 'EndTag', 'expected end tag');

            return node;
        }
    }, {
        key: 'currentComment',
        get: function get() {
            var node = this.currentNode;
            false && (0, _util.assert)(node && node.type === 'CommentStatement', 'expected a comment');

            return node;
        }
    }, {
        key: 'currentData',
        get: function get() {
            var node = this.currentNode;
            false && (0, _util.assert)(node && node.type === 'TextNode', 'expected a text node');

            return node;
        }
    }]);

    return Parser;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3N5bnRheC9saWIvcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLElBQUEsMEJBQUEsWUFBQTtBQVNFLGFBQUEsTUFBQSxDQUFBLE1BQUEsRUFBMEU7QUFBQSxZQUE5QyxlQUE4QyxVQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsVUFBQSxDQUFBLE1BQUEsU0FBQSxHQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQS9CLElBQUEsaUNBQUEsQ0FBM0MsdUNBQTJDLENBQStCOztBQUFBLHdCQUFBLElBQUEsRUFBQSxNQUFBOztBQVJoRSxhQUFBLFlBQUEsR0FBQSxFQUFBO0FBRUgsYUFBQSxnQkFBQSxHQUFBLElBQUE7QUFDQSxhQUFBLFdBQUEsR0FBQSxJQUFBO0FBTUwsYUFBQSxNQUFBLEdBQWMsT0FBQSxLQUFBLENBQWQsZUFBYyxDQUFkO0FBQ0EsYUFBQSxTQUFBLEdBQWlCLElBQUEscUNBQUEsQ0FBQSxJQUFBLEVBQWpCLFlBQWlCLENBQWpCO0FBQ0Q7O0FBWkgsV0FBQSxTQUFBLENBQUEsY0FBQSxHQUFBLFNBQUEsY0FBQSxDQUFBLElBQUEsRUF1RmtDO0FBQzlCLGVBQVEsS0FBYSxLQUFiLElBQUEsRUFBUixJQUFRLENBQVI7QUF4RkosS0FBQTs7QUFBQSxXQUFBLFNBQUEsQ0FBQSxVQUFBLEdBQUEsU0FBQSxVQUFBLENBQUEsSUFBQSxFQTZGMkI7QUFDdkIsZUFBUSxLQUFhLEtBQWIsSUFBQSxFQUFSLElBQVEsQ0FBUjtBQTlGSixLQUFBOztBQUFBLFdBQUEsU0FBQSxDQUFBLGNBQUEsR0FBQSxTQUFBLGNBQUEsR0FpR2dCO0FBQ1osZUFBTyxLQUFBLFlBQUEsQ0FBa0IsS0FBQSxZQUFBLENBQUEsTUFBQSxHQUF6QixDQUFPLENBQVA7QUFsR0osS0FBQTs7QUFBQSxXQUFBLFNBQUEsQ0FBQSxhQUFBLEdBQUEsU0FBQSxh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QTtBQURhLHFCQUViLGtCQUFPLFFBQVEsS0FBQSxJQUFBLEtBQWYsVUFBQSxFQUZhLHNCQUViLENBRmE7O0FBR2IsbUJBQUEsSUFBQTtBQUNEO0FBckZILEtBQUEsQ0FBQTs7QUFBQSxXQUFBLE1BQUE7QUFBQSxDQUFBLEVBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFdmVudGVkVG9rZW5pemVyLFxuICBFbnRpdHlQYXJzZXIsXG4gIEhUTUw1TmFtZWRDaGFyUmVmcyBhcyBuYW1lZENoYXJSZWZzLFxufSBmcm9tICdzaW1wbGUtaHRtbC10b2tlbml6ZXInO1xuaW1wb3J0ICogYXMgQVNUIGZyb20gJy4vdHlwZXMvbm9kZXMnO1xuaW1wb3J0ICogYXMgSEJTIGZyb20gJy4vdHlwZXMvaGFuZGxlYmFycy1hc3QnO1xuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnQGdsaW1tZXIvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBhc3NlcnQsIGV4cGVjdCB9IGZyb20gJ0BnbGltbWVyL3V0aWwnO1xuXG5leHBvcnQgdHlwZSBFbGVtZW50ID0gQVNULlRlbXBsYXRlIHwgQVNULkJsb2NrIHwgQVNULkVsZW1lbnROb2RlO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRhZzxUIGV4dGVuZHMgJ1N0YXJ0VGFnJyB8ICdFbmRUYWcnPiB7XG4gIHR5cGU6IFQ7XG4gIG5hbWU6IHN0cmluZztcbiAgYXR0cmlidXRlczogYW55W107XG4gIG1vZGlmaWVyczogYW55W107XG4gIGNvbW1lbnRzOiBhbnlbXTtcbiAgc2VsZkNsb3Npbmc6IGJvb2xlYW47XG4gIGxvYzogQVNULlNvdXJjZUxvY2F0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEF0dHJpYnV0ZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcGFydHM6IChBU1QuTXVzdGFjaGVTdGF0ZW1lbnQgfCBBU1QuVGV4dE5vZGUpW107XG4gIGlzUXVvdGVkOiBib29sZWFuO1xuICBpc0R5bmFtaWM6IGJvb2xlYW47XG4gIHN0YXJ0OiBBU1QuUG9zaXRpb247XG4gIHZhbHVlU3RhcnRMaW5lOiBudW1iZXI7XG4gIHZhbHVlU3RhcnRDb2x1bW46IG51bWJlcjtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhcnNlciB7XG4gIHByb3RlY3RlZCBlbGVtZW50U3RhY2s6IEVsZW1lbnRbXSA9IFtdO1xuICBwcml2YXRlIHNvdXJjZTogc3RyaW5nW107XG4gIHB1YmxpYyBjdXJyZW50QXR0cmlidXRlOiBPcHRpb248QXR0cmlidXRlPiA9IG51bGw7XG4gIHB1YmxpYyBjdXJyZW50Tm9kZTogT3B0aW9uPFxuICAgIEFTVC5Db21tZW50U3RhdGVtZW50IHwgQVNULlRleHROb2RlIHwgVGFnPCdTdGFydFRhZycgfCAnRW5kVGFnJz5cbiAgPiA9IG51bGw7XG4gIHB1YmxpYyB0b2tlbml6ZXI6IEV2ZW50ZWRUb2tlbml6ZXI7XG5cbiAgY29uc3RydWN0b3Ioc291cmNlOiBzdHJpbmcsIGVudGl0eVBhcnNlciA9IG5ldyBFbnRpdHlQYXJzZXIobmFtZWRDaGFyUmVmcykpIHtcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZS5zcGxpdCgvKD86XFxyXFxuP3xcXG4pL2cpO1xuICAgIHRoaXMudG9rZW5pemVyID0gbmV3IEV2ZW50ZWRUb2tlbml6ZXIodGhpcywgZW50aXR5UGFyc2VyKTtcbiAgfVxuXG4gIGFic3RyYWN0IFByb2dyYW0obm9kZTogSEJTLlByb2dyYW0pOiBIQlMuT3V0cHV0PCdQcm9ncmFtJz47XG4gIGFic3RyYWN0IE11c3RhY2hlU3RhdGVtZW50KG5vZGU6IEhCUy5NdXN0YWNoZVN0YXRlbWVudCk6IEhCUy5PdXRwdXQ8J011c3RhY2hlU3RhdGVtZW50Jz47XG4gIGFic3RyYWN0IERlY29yYXRvcihub2RlOiBIQlMuRGVjb3JhdG9yKTogSEJTLk91dHB1dDwnRGVjb3JhdG9yJz47XG4gIGFic3RyYWN0IEJsb2NrU3RhdGVtZW50KG5vZGU6IEhCUy5CbG9ja1N0YXRlbWVudCk6IEhCUy5PdXRwdXQ8J0Jsb2NrU3RhdGVtZW50Jz47XG4gIGFic3RyYWN0IERlY29yYXRvckJsb2NrKG5vZGU6IEhCUy5EZWNvcmF0b3JCbG9jayk6IEhCUy5PdXRwdXQ8J0RlY29yYXRvckJsb2NrJz47XG4gIGFic3RyYWN0IFBhcnRpYWxTdGF0ZW1lbnQobm9kZTogSEJTLlBhcnRpYWxTdGF0ZW1lbnQpOiBIQlMuT3V0cHV0PCdQYXJ0aWFsU3RhdGVtZW50Jz47XG4gIGFic3RyYWN0IFBhcnRpYWxCbG9ja1N0YXRlbWVudChcbiAgICBub2RlOiBIQlMuUGFydGlhbEJsb2NrU3RhdGVtZW50XG4gICk6IEhCUy5PdXRwdXQ8J1BhcnRpYWxCbG9ja1N0YXRlbWVudCc+O1xuICBhYnN0cmFjdCBDb250ZW50U3RhdGVtZW50KG5vZGU6IEhCUy5Db250ZW50U3RhdGVtZW50KTogSEJTLk91dHB1dDwnQ29udGVudFN0YXRlbWVudCc+O1xuICBhYnN0cmFjdCBDb21tZW50U3RhdGVtZW50KG5vZGU6IEhCUy5Db21tZW50U3RhdGVtZW50KTogSEJTLk91dHB1dDwnQ29tbWVudFN0YXRlbWVudCc+O1xuICBhYnN0cmFjdCBTdWJFeHByZXNzaW9uKG5vZGU6IEhCUy5TdWJFeHByZXNzaW9uKTogSEJTLk91dHB1dDwnU3ViRXhwcmVzc2lvbic+O1xuICBhYnN0cmFjdCBQYXRoRXhwcmVzc2lvbihub2RlOiBIQlMuUGF0aEV4cHJlc3Npb24pOiBIQlMuT3V0cHV0PCdQYXRoRXhwcmVzc2lvbic+O1xuICBhYnN0cmFjdCBTdHJpbmdMaXRlcmFsKG5vZGU6IEhCUy5TdHJpbmdMaXRlcmFsKTogSEJTLk91dHB1dDwnU3RyaW5nTGl0ZXJhbCc+O1xuICBhYnN0cmFjdCBCb29sZWFuTGl0ZXJhbChub2RlOiBIQlMuQm9vbGVhbkxpdGVyYWwpOiBIQlMuT3V0cHV0PCdCb29sZWFuTGl0ZXJhbCc+O1xuICBhYnN0cmFjdCBOdW1iZXJMaXRlcmFsKG5vZGU6IEhCUy5OdW1iZXJMaXRlcmFsKTogSEJTLk91dHB1dDwnTnVtYmVyTGl0ZXJhbCc+O1xuICBhYnN0cmFjdCBVbmRlZmluZWRMaXRlcmFsKG5vZGU6IEhCUy5VbmRlZmluZWRMaXRlcmFsKTogSEJTLk91dHB1dDwnVW5kZWZpbmVkTGl0ZXJhbCc+O1xuICBhYnN0cmFjdCBOdWxsTGl0ZXJhbChub2RlOiBIQlMuTnVsbExpdGVyYWwpOiBIQlMuT3V0cHV0PCdOdWxsTGl0ZXJhbCc+O1xuXG4gIGFic3RyYWN0IHJlc2V0KCk6IHZvaWQ7XG4gIGFic3RyYWN0IGZpbmlzaERhdGEoKTogdm9pZDtcbiAgYWJzdHJhY3QgdGFnT3BlbigpOiB2b2lkO1xuICBhYnN0cmFjdCBiZWdpbkRhdGEoKTogdm9pZDtcbiAgYWJzdHJhY3QgYXBwZW5kVG9EYXRhKGNoYXI6IHN0cmluZyk6IHZvaWQ7XG4gIGFic3RyYWN0IGJlZ2luU3RhcnRUYWcoKTogdm9pZDtcbiAgYWJzdHJhY3QgYXBwZW5kVG9UYWdOYW1lKGNoYXI6IHN0cmluZyk6IHZvaWQ7XG4gIGFic3RyYWN0IGJlZ2luQXR0cmlidXRlKCk6IHZvaWQ7XG4gIGFic3RyYWN0IGFwcGVuZFRvQXR0cmlidXRlTmFtZShjaGFyOiBzdHJpbmcpOiB2b2lkO1xuICBhYnN0cmFjdCBiZWdpbkF0dHJpYnV0ZVZhbHVlKHF1b3RlZDogYm9vbGVhbik6IHZvaWQ7XG4gIGFic3RyYWN0IGFwcGVuZFRvQXR0cmlidXRlVmFsdWUoY2hhcjogc3RyaW5nKTogdm9pZDtcbiAgYWJzdHJhY3QgZmluaXNoQXR0cmlidXRlVmFsdWUoKTogdm9pZDtcbiAgYWJzdHJhY3QgbWFya1RhZ0FzU2VsZkNsb3NpbmcoKTogdm9pZDtcbiAgYWJzdHJhY3QgYmVnaW5FbmRUYWcoKTogdm9pZDtcbiAgYWJzdHJhY3QgZmluaXNoVGFnKCk6IHZvaWQ7XG4gIGFic3RyYWN0IGJlZ2luQ29tbWVudCgpOiB2b2lkO1xuICBhYnN0cmFjdCBhcHBlbmRUb0NvbW1lbnREYXRhKGNoYXI6IHN0cmluZyk6IHZvaWQ7XG4gIGFic3RyYWN0IGZpbmlzaENvbW1lbnQoKTogdm9pZDtcbiAgYWJzdHJhY3QgcmVwb3J0U3ludGF4RXJyb3IoZXJyb3I6IHN0cmluZyk6IHZvaWQ7XG5cbiAgZ2V0IGN1cnJlbnRBdHRyKCk6IEF0dHJpYnV0ZSB7XG4gICAgcmV0dXJuIGV4cGVjdCh0aGlzLmN1cnJlbnRBdHRyaWJ1dGUsICdleHBlY3RlZCBhdHRyaWJ1dGUnKTtcbiAgfVxuXG4gIGdldCBjdXJyZW50VGFnKCk6IFRhZzwnU3RhcnRUYWcnIHwgJ0VuZFRhZyc+IHtcbiAgICBsZXQgbm9kZSA9IHRoaXMuY3VycmVudE5vZGU7XG4gICAgYXNzZXJ0KG5vZGUgJiYgKG5vZGUudHlwZSA9PT0gJ1N0YXJ0VGFnJyB8fCBub2RlLnR5cGUgPT09ICdFbmRUYWcnKSwgJ2V4cGVjdGVkIHRhZycpO1xuICAgIHJldHVybiBub2RlIGFzIFRhZzwnU3RhcnRUYWcnIHwgJ0VuZFRhZyc+O1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRTdGFydFRhZygpOiBUYWc8J1N0YXJ0VGFnJz4ge1xuICAgIGxldCBub2RlID0gdGhpcy5jdXJyZW50Tm9kZTtcbiAgICBhc3NlcnQobm9kZSAmJiBub2RlLnR5cGUgPT09ICdTdGFydFRhZycsICdleHBlY3RlZCBzdGFydCB0YWcnKTtcbiAgICByZXR1cm4gbm9kZSBhcyBUYWc8J1N0YXJ0VGFnJz47XG4gIH1cblxuICBnZXQgY3VycmVudEVuZFRhZygpOiBUYWc8J0VuZFRhZyc+IHtcbiAgICBsZXQgbm9kZSA9IHRoaXMuY3VycmVudE5vZGU7XG4gICAgYXNzZXJ0KG5vZGUgJiYgbm9kZS50eXBlID09PSAnRW5kVGFnJywgJ2V4cGVjdGVkIGVuZCB0YWcnKTtcbiAgICByZXR1cm4gbm9kZSBhcyBUYWc8J0VuZFRhZyc+O1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRDb21tZW50KCk6IEFTVC5Db21tZW50U3RhdGVtZW50IHtcbiAgICBsZXQgbm9kZSA9IHRoaXMuY3VycmVudE5vZGU7XG4gICAgYXNzZXJ0KG5vZGUgJiYgbm9kZS50eXBlID09PSAnQ29tbWVudFN0YXRlbWVudCcsICdleHBlY3RlZCBhIGNvbW1lbnQnKTtcbiAgICByZXR1cm4gbm9kZSBhcyBBU1QuQ29tbWVudFN0YXRlbWVudDtcbiAgfVxuXG4gIGdldCBjdXJyZW50RGF0YSgpOiBBU1QuVGV4dE5vZGUge1xuICAgIGxldCBub2RlID0gdGhpcy5jdXJyZW50Tm9kZTtcbiAgICBhc3NlcnQobm9kZSAmJiBub2RlLnR5cGUgPT09ICdUZXh0Tm9kZScsICdleHBlY3RlZCBhIHRleHQgbm9kZScpO1xuICAgIHJldHVybiBub2RlIGFzIEFTVC5UZXh0Tm9kZTtcbiAgfVxuXG4gIGFjY2VwdFRlbXBsYXRlKG5vZGU6IEhCUy5Qcm9ncmFtKTogQVNULlRlbXBsYXRlIHtcbiAgICByZXR1cm4gKHRoaXMgYXMgYW55KVtub2RlLnR5cGVdKG5vZGUpIGFzIEFTVC5UZW1wbGF0ZTtcbiAgfVxuXG4gIGFjY2VwdE5vZGUobm9kZTogSEJTLlByb2dyYW0pOiBBU1QuQmxvY2sgfCBBU1QuVGVtcGxhdGU7XG4gIGFjY2VwdE5vZGU8VSBleHRlbmRzIEhCUy5Ob2RlIHwgQVNULk5vZGU+KG5vZGU6IEhCUy5Ob2RlKTogVTtcbiAgYWNjZXB0Tm9kZShub2RlOiBIQlMuTm9kZSk6IGFueSB7XG4gICAgcmV0dXJuICh0aGlzIGFzIGFueSlbbm9kZS50eXBlXShub2RlKTtcbiAgfVxuXG4gIGN1cnJlbnRFbGVtZW50KCk6IEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRTdGFja1t0aGlzLmVsZW1lbnRTdGFjay5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIHNvdXJjZUZvck5vZGUobm9kZTogSEJTLk5vZGUsIGVuZE5vZGU/OiB7IGxvYzogSEJTLlNvdXJjZUxvY2F0aW9uIH0pOiBzdHJpbmcge1xuICAgIGxldCBmaXJzdExpbmUgPSBub2RlLmxvYy5zdGFydC5saW5lIC0gMTtcbiAgICBsZXQgY3VycmVudExpbmUgPSBmaXJzdExpbmUgLSAxO1xuICAgIGxldCBmaXJzdENvbHVtbiA9IG5vZGUubG9jLnN0YXJ0LmNvbHVtbjtcbiAgICBsZXQgc3RyaW5nID0gW107XG4gICAgbGV0IGxpbmU7XG5cbiAgICBsZXQgbGFzdExpbmU6IG51bWJlcjtcbiAgICBsZXQgbGFzdENvbHVtbjogbnVtYmVyO1xuXG4gICAgaWYgKGVuZE5vZGUpIHtcbiAgICAgIGxhc3RMaW5lID0gZW5kTm9kZS5sb2MuZW5kLmxpbmUgLSAxO1xuICAgICAgbGFzdENvbHVtbiA9IGVuZE5vZGUubG9jLmVuZC5jb2x1bW47XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RMaW5lID0gbm9kZS5sb2MuZW5kLmxpbmUgLSAxO1xuICAgICAgbGFzdENvbHVtbiA9IG5vZGUubG9jLmVuZC5jb2x1bW47XG4gICAgfVxuXG4gICAgd2hpbGUgKGN1cnJlbnRMaW5lIDwgbGFzdExpbmUpIHtcbiAgICAgIGN1cnJlbnRMaW5lKys7XG4gICAgICBsaW5lID0gdGhpcy5zb3VyY2VbY3VycmVudExpbmVdO1xuXG4gICAgICBpZiAoY3VycmVudExpbmUgPT09IGZpcnN0TGluZSkge1xuICAgICAgICBpZiAoZmlyc3RMaW5lID09PSBsYXN0TGluZSkge1xuICAgICAgICAgIHN0cmluZy5wdXNoKGxpbmUuc2xpY2UoZmlyc3RDb2x1bW4sIGxhc3RDb2x1bW4pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHJpbmcucHVzaChsaW5lLnNsaWNlKGZpcnN0Q29sdW1uKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudExpbmUgPT09IGxhc3RMaW5lKSB7XG4gICAgICAgIHN0cmluZy5wdXNoKGxpbmUuc2xpY2UoMCwgbGFzdENvbHVtbikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyaW5nLnB1c2gobGluZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZy5qb2luKCdcXG4nKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==