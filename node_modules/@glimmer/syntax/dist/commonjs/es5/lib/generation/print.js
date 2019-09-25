'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = build;

var _tokenizerEventHandlers = require('../parser/tokenizer-event-handlers');

var _util = require('./util');

function unreachable() {
    throw new Error('unreachable');
}
function build(ast) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { entityEncoding: 'transformed' };

    if (!ast) {
        return '';
    }
    if (options.override) {
        var result = options.override(ast, options);
        if (result !== undefined) {
            return result;
        }
    }
    function buildEach(asts) {
        return asts.map(function (node) {
            return build(node, options);
        });
    }
    function pathParams(ast) {
        var path = void 0;
        switch (ast.type) {
            case 'MustacheStatement':
            case 'SubExpression':
            case 'ElementModifierStatement':
            case 'BlockStatement':
                path = build(ast.path, options);
                break;
            case 'PartialStatement':
                path = build(ast.name, options);
                break;
            default:
                return unreachable();
        }
        return compactJoin([path, buildEach(ast.params).join(' '), build(ast.hash, options)], ' ');
    }
    function compactJoin(array, delimiter) {
        return compact(array).join(delimiter || '');
    }
    function blockParams(block) {
        var params = block.program.blockParams;
        if (params.length) {
            return ' as |' + params.join(' ') + '|';
        }
        return null;
    }
    function openBlock(block) {
        return compactJoin(['{{', block.openStrip.open ? '~' : null, '#', pathParams(block), blockParams(block), block.openStrip.close ? '~' : null, '}}']);
    }
    function closeBlock(block) {
        return compactJoin(['{{', block.closeStrip.open ? '~' : null, '/', build(block.path, options), block.closeStrip.close ? '~' : null, '}}']);
    }
    var output = [];
    switch (ast.type) {
        case 'Program':
        case 'Block':
        case 'Template':
            {
                var chainBlock = ast.chained && ast.body[0];
                if (chainBlock) {
                    chainBlock.chained = true;
                }
                var body = buildEach(ast.body).join('');
                output.push(body);
            }
            break;
        case 'ElementNode':
            output.push('<', ast.tag);
            if (ast.attributes.length) {
                output.push(' ', buildEach(ast.attributes).join(' '));
            }
            if (ast.modifiers.length) {
                output.push(' ', buildEach(ast.modifiers).join(' '));
            }
            if (ast.comments.length) {
                output.push(' ', buildEach(ast.comments).join(' '));
            }
            if (ast.blockParams.length) {
                output.push(' ', 'as', ' ', '|' + ast.blockParams.join(' ') + '|');
            }
            if (_tokenizerEventHandlers.voidMap[ast.tag]) {
                if (ast.selfClosing) {
                    output.push(' /');
                }
                output.push('>');
            } else if (ast.selfClosing) {
                output.push(' />');
            } else {
                output.push('>');
                output.push.apply(output, buildEach(ast.children));
                output.push('</', ast.tag, '>');
            }
            break;
        case 'AttrNode':
            if (ast.value.type === 'TextNode') {
                if (ast.value.chars !== '') {
                    output.push(ast.name, '=');
                    output.push('"', options.entityEncoding === 'raw' ? ast.value.chars : (0, _util.escapeAttrValue)(ast.value.chars), '"');
                } else {
                    output.push(ast.name);
                }
            } else {
                output.push(ast.name, '=');
                // ast.value is mustache or concat
                output.push(build(ast.value, options));
            }
            break;
        case 'ConcatStatement':
            output.push('"');
            ast.parts.forEach(function (node) {
                if (node.type === 'TextNode') {
                    output.push(options.entityEncoding === 'raw' ? node.chars : (0, _util.escapeAttrValue)(node.chars));
                } else {
                    output.push(build(node, options));
                }
            });
            output.push('"');
            break;
        case 'TextNode':
            output.push(options.entityEncoding === 'raw' ? ast.chars : (0, _util.escapeText)(ast.chars));
            break;
        case 'MustacheStatement':
            {
                output.push(compactJoin([ast.escaped ? '{{' : '{{{', ast.strip.open ? '~' : null, pathParams(ast), ast.strip.close ? '~' : null, ast.escaped ? '}}' : '}}}']));
            }
            break;
        case 'MustacheCommentStatement':
            {
                output.push(compactJoin(['{{!--', ast.value, '--}}']));
            }
            break;
        case 'ElementModifierStatement':
            {
                output.push(compactJoin(['{{', pathParams(ast), '}}']));
            }
            break;
        case 'PathExpression':
            output.push(ast.original);
            break;
        case 'SubExpression':
            {
                output.push('(', pathParams(ast), ')');
            }
            break;
        case 'BooleanLiteral':
            output.push(ast.value ? 'true' : 'false');
            break;
        case 'BlockStatement':
            {
                var lines = [];
                if (ast.chained) {
                    lines.push(compactJoin(['{{', ast.inverseStrip.open ? '~' : null, 'else ', pathParams(ast), ast.inverseStrip.close ? '~' : null, '}}']));
                } else {
                    lines.push(openBlock(ast));
                }
                lines.push(build(ast.program, options));
                if (ast.inverse) {
                    if (!ast.inverse.chained) {
                        lines.push(compactJoin(['{{', ast.inverseStrip.open ? '~' : null, 'else', ast.inverseStrip.close ? '~' : null, '}}']));
                    }
                    lines.push(build(ast.inverse, options));
                }
                if (!ast.chained) {
                    lines.push(closeBlock(ast));
                }
                output.push(lines.join(''));
            }
            break;
        case 'PartialStatement':
            {
                output.push(compactJoin(['{{>', pathParams(ast), '}}']));
            }
            break;
        case 'CommentStatement':
            {
                output.push(compactJoin(['<!--', ast.value, '-->']));
            }
            break;
        case 'StringLiteral':
            {
                output.push('"' + ast.value + '"');
            }
            break;
        case 'NumberLiteral':
            {
                output.push(String(ast.value));
            }
            break;
        case 'UndefinedLiteral':
            {
                output.push('undefined');
            }
            break;
        case 'NullLiteral':
            {
                output.push('null');
            }
            break;
        case 'Hash':
            {
                output.push(ast.pairs.map(function (pair) {
                    return build(pair, options);
                }).join(' '));
            }
            break;
        case 'HashPair':
            {
                output.push(ast.key + '=' + build(ast.value, options));
            }
            break;
    }
    return output.join('');
}
function compact(array) {
    var newArray = [];
    array.forEach(function (a) {
        if (typeof a !== 'undefined' && a !== null && a !== '') {
            newArray.push(a);
        }
    });
    return newArray;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3N5bnRheC9saWIvZ2VuZXJhdGlvbi9wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkE2QmMsSzs7OztBQTFCZDs7QUFFQSxTQUFBLFdBQUEsR0FBb0I7QUFDbEIsVUFBTSxJQUFBLEtBQUEsQ0FBTixhQUFNLENBQU47QUFDRDtBQXNCYSxTQUFBLEtBQUEsQ0FBQSxHQUFBLEVBRStDO0FBQUEsUUFBM0QsVUFBMkQsVUFBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLFVBQUEsQ0FBQSxNQUFBLFNBQUEsR0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFqQyxFQUFFLGdCQUZoQixhQUVjLEVBQWlDOztBQUUzRCxRQUFJLENBQUosR0FBQSxFQUFVO0FBQ1IsZUFBQSxFQUFBO0FBQ0Q7QUFFRCxRQUFJLFFBQUosUUFBQSxFQUFzQjtBQUNwQixZQUFJLFNBQVMsUUFBQSxRQUFBLENBQUEsR0FBQSxFQUFiLE9BQWEsQ0FBYjtBQUVBLFlBQUksV0FBSixTQUFBLEVBQTBCO0FBQ3hCLG1CQUFBLE1BQUE7QUFDRDtBQUNGO0FBRUQsYUFBQSxTQUFBLENBQUEsSUFBQSxFQUFtQztBQUNqQyxlQUFPLEtBQUEsR0FBQSxDQUFTLFVBQUEsSUFBQSxFQUFBO0FBQUEsbUJBQVEsTUFBQSxJQUFBLEVBQXhCLE9BQXdCLENBQVI7QUFBaEIsU0FBTyxDQUFQO0FBQ0Q7QUFFRCxhQUFBLFVBQUEsQ0FBQSxHQUFBLEVBQWlDO0FBQy9CLFlBQUEsT0FBQSxLQUFBLENBQUE7QUFFQSxnQkFBUSxJQUFSLElBQUE7QUFDRSxpQkFBQSxtQkFBQTtBQUNBLGlCQUFBLGVBQUE7QUFDQSxpQkFBQSwwQkFBQTtBQUNBLGlCQUFBLGdCQUFBO0FBQ0UsdUJBQU8sTUFBTSxJQUFOLElBQUEsRUFBUCxPQUFPLENBQVA7QUFDQTtBQUNGLGlCQUFBLGtCQUFBO0FBQ0UsdUJBQU8sTUFBTSxJQUFOLElBQUEsRUFBUCxPQUFPLENBQVA7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QkFBQSxJQUFBLENBQUEsQ0FBQTtBQUNEO0FBSEgsS0FBQTtBQUtBLFdBQUEsUUFBQTtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnQGdsaW1tZXIvaW50ZXJmYWNlcyc7XG5pbXBvcnQgKiBhcyBBU1QgZnJvbSAnLi4vdHlwZXMvbm9kZXMnO1xuaW1wb3J0IHsgdm9pZE1hcCB9IGZyb20gJy4uL3BhcnNlci90b2tlbml6ZXItZXZlbnQtaGFuZGxlcnMnO1xuaW1wb3J0IHsgZXNjYXBlVGV4dCwgZXNjYXBlQXR0clZhbHVlIH0gZnJvbSAnLi91dGlsJztcblxuZnVuY3Rpb24gdW5yZWFjaGFibGUoKTogbmV2ZXIge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVhY2hhYmxlJyk7XG59XG5cbmludGVyZmFjZSBQcmludGVyT3B0aW9ucyB7XG4gIGVudGl0eUVuY29kaW5nOiAndHJhbnNmb3JtZWQnIHwgJ3Jhdyc7XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gb3ZlcnJpZGUgdGhlIG1lY2hhbmlzbSBvZiBwcmludGluZyBhIGdpdmVuIEFTVC5Ob2RlLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgZ2VuZXJhbGx5IG9ubHkgYmUgdXNlZnVsIHRvIHNvdXJjZSAtPiBzb3VyY2UgY29kZW1vZHNcbiAgICogd2hlcmUgeW91IHdvdWxkIGxpa2UgdG8gc3BlY2lhbGl6ZS9vdmVycmlkZSB0aGUgd2F5IGEgZ2l2ZW4gbm9kZSBpc1xuICAgKiBwcmludGVkIChlLmcuIHlvdSB3b3VsZCBsaWtlIHRvIHByZXNlcnZlIGFzIG11Y2ggb2YgdGhlIG9yaWdpbmFsXG4gICAqIGZvcm1hdHRpbmcgYXMgcG9zc2libGUpLlxuICAgKlxuICAgKiBXaGVuIHRoZSBwcm92aWRlZCBvdmVycmlkZSByZXR1cm5zIHVuZGVmaW5lZCwgdGhlIGRlZmF1bHQgYnVpbHQgaW4gcHJpbnRpbmdcbiAgICogd2lsbCBiZSBkb25lIGZvciB0aGUgQVNULk5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSBhc3QgdGhlIGFzdCBub2RlIHRvIGJlIHByaW50ZWRcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgc3BlY2lmaWVkIGR1cmluZyB0aGUgcHJpbnQoKSBpbnZvY2F0aW9uXG4gICAqL1xuICBvdmVycmlkZT8oYXN0OiBBU1QuTm9kZSwgb3B0aW9uczogUHJpbnRlck9wdGlvbnMpOiB2b2lkIHwgc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZChcbiAgYXN0OiBBU1QuTm9kZSxcbiAgb3B0aW9uczogUHJpbnRlck9wdGlvbnMgPSB7IGVudGl0eUVuY29kaW5nOiAndHJhbnNmb3JtZWQnIH1cbik6IHN0cmluZyB7XG4gIGlmICghYXN0KSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMub3ZlcnJpZGUpIHtcbiAgICBsZXQgcmVzdWx0ID0gb3B0aW9ucy5vdmVycmlkZShhc3QsIG9wdGlvbnMpO1xuXG4gICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkRWFjaChhc3RzOiBBU1QuTm9kZVtdKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBhc3RzLm1hcChub2RlID0+IGJ1aWxkKG5vZGUsIG9wdGlvbnMpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhdGhQYXJhbXMoYXN0OiBBU1QuTm9kZSk6IHN0cmluZyB7XG4gICAgbGV0IHBhdGg6IHN0cmluZztcblxuICAgIHN3aXRjaCAoYXN0LnR5cGUpIHtcbiAgICAgIGNhc2UgJ011c3RhY2hlU3RhdGVtZW50JzpcbiAgICAgIGNhc2UgJ1N1YkV4cHJlc3Npb24nOlxuICAgICAgY2FzZSAnRWxlbWVudE1vZGlmaWVyU3RhdGVtZW50JzpcbiAgICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgICAgcGF0aCA9IGJ1aWxkKGFzdC5wYXRoLCBvcHRpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQYXJ0aWFsU3RhdGVtZW50JzpcbiAgICAgICAgcGF0aCA9IGJ1aWxkKGFzdC5uYW1lLCBvcHRpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdW5yZWFjaGFibGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tcGFjdEpvaW4oW3BhdGgsIGJ1aWxkRWFjaChhc3QucGFyYW1zKS5qb2luKCcgJyksIGJ1aWxkKGFzdC5oYXNoLCBvcHRpb25zKV0sICcgJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjb21wYWN0Sm9pbihhcnJheTogT3B0aW9uPHN0cmluZz5bXSwgZGVsaW1pdGVyPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY29tcGFjdChhcnJheSkuam9pbihkZWxpbWl0ZXIgfHwgJycpO1xuICB9XG5cbiAgZnVuY3Rpb24gYmxvY2tQYXJhbXMoYmxvY2s6IEFTVC5CbG9ja1N0YXRlbWVudCk6IE9wdGlvbjxzdHJpbmc+IHtcbiAgICBjb25zdCBwYXJhbXMgPSBibG9jay5wcm9ncmFtLmJsb2NrUGFyYW1zO1xuICAgIGlmIChwYXJhbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYCBhcyB8JHtwYXJhbXMuam9pbignICcpfXxgO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gb3BlbkJsb2NrKGJsb2NrOiBBU1QuQmxvY2tTdGF0ZW1lbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb21wYWN0Sm9pbihbXG4gICAgICAne3snLFxuICAgICAgYmxvY2sub3BlblN0cmlwLm9wZW4gPyAnficgOiBudWxsLFxuICAgICAgJyMnLFxuICAgICAgcGF0aFBhcmFtcyhibG9jayksXG4gICAgICBibG9ja1BhcmFtcyhibG9jayksXG4gICAgICBibG9jay5vcGVuU3RyaXAuY2xvc2UgPyAnficgOiBudWxsLFxuICAgICAgJ319JyxcbiAgICBdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlQmxvY2soYmxvY2s6IEFTVC5CbG9ja1N0YXRlbWVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNvbXBhY3RKb2luKFtcbiAgICAgICd7eycsXG4gICAgICBibG9jay5jbG9zZVN0cmlwLm9wZW4gPyAnficgOiBudWxsLFxuICAgICAgJy8nLFxuICAgICAgYnVpbGQoYmxvY2sucGF0aCwgb3B0aW9ucyksXG4gICAgICBibG9jay5jbG9zZVN0cmlwLmNsb3NlID8gJ34nIDogbnVsbCxcbiAgICAgICd9fScsXG4gICAgXSk7XG4gIH1cblxuICBjb25zdCBvdXRwdXQ6IHN0cmluZ1tdID0gW107XG5cbiAgc3dpdGNoIChhc3QudHlwZSkge1xuICAgIGNhc2UgJ1Byb2dyYW0nOlxuICAgIGNhc2UgJ0Jsb2NrJzpcbiAgICBjYXNlICdUZW1wbGF0ZSc6XG4gICAgICB7XG4gICAgICAgIGNvbnN0IGNoYWluQmxvY2sgPSBhc3QuY2hhaW5lZCAmJiBhc3QuYm9keVswXTtcbiAgICAgICAgaWYgKGNoYWluQmxvY2spIHtcbiAgICAgICAgICAoY2hhaW5CbG9jayBhcyBBU1QuQmxvY2tTdGF0ZW1lbnQpLmNoYWluZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJvZHkgPSBidWlsZEVhY2goYXN0LmJvZHkpLmpvaW4oJycpO1xuICAgICAgICBvdXRwdXQucHVzaChib2R5KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0VsZW1lbnROb2RlJzpcbiAgICAgIG91dHB1dC5wdXNoKCc8JywgYXN0LnRhZyk7XG4gICAgICBpZiAoYXN0LmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgIG91dHB1dC5wdXNoKCcgJywgYnVpbGRFYWNoKGFzdC5hdHRyaWJ1dGVzKS5qb2luKCcgJykpO1xuICAgICAgfVxuICAgICAgaWYgKGFzdC5tb2RpZmllcnMubGVuZ3RoKSB7XG4gICAgICAgIG91dHB1dC5wdXNoKCcgJywgYnVpbGRFYWNoKGFzdC5tb2RpZmllcnMpLmpvaW4oJyAnKSk7XG4gICAgICB9XG4gICAgICBpZiAoYXN0LmNvbW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBvdXRwdXQucHVzaCgnICcsIGJ1aWxkRWFjaChhc3QuY29tbWVudHMpLmpvaW4oJyAnKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhc3QuYmxvY2tQYXJhbXMubGVuZ3RoKSB7XG4gICAgICAgIG91dHB1dC5wdXNoKCcgJywgJ2FzJywgJyAnLCBgfCR7YXN0LmJsb2NrUGFyYW1zLmpvaW4oJyAnKX18YCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh2b2lkTWFwW2FzdC50YWddKSB7XG4gICAgICAgIGlmIChhc3Quc2VsZkNsb3NpbmcpIHtcbiAgICAgICAgICBvdXRwdXQucHVzaCgnIC8nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG91dHB1dC5wdXNoKCc+Jyk7XG4gICAgICB9IGVsc2UgaWYgKGFzdC5zZWxmQ2xvc2luZykge1xuICAgICAgICBvdXRwdXQucHVzaCgnIC8+Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQucHVzaCgnPicpO1xuICAgICAgICBvdXRwdXQucHVzaC5hcHBseShvdXRwdXQsIGJ1aWxkRWFjaChhc3QuY2hpbGRyZW4pKTtcbiAgICAgICAgb3V0cHV0LnB1c2goJzwvJywgYXN0LnRhZywgJz4nKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0F0dHJOb2RlJzpcbiAgICAgIGlmIChhc3QudmFsdWUudHlwZSA9PT0gJ1RleHROb2RlJykge1xuICAgICAgICBpZiAoYXN0LnZhbHVlLmNoYXJzICE9PSAnJykge1xuICAgICAgICAgIG91dHB1dC5wdXNoKGFzdC5uYW1lLCAnPScpO1xuICAgICAgICAgIG91dHB1dC5wdXNoKFxuICAgICAgICAgICAgJ1wiJyxcbiAgICAgICAgICAgIG9wdGlvbnMuZW50aXR5RW5jb2RpbmcgPT09ICdyYXcnID8gYXN0LnZhbHVlLmNoYXJzIDogZXNjYXBlQXR0clZhbHVlKGFzdC52YWx1ZS5jaGFycyksXG4gICAgICAgICAgICAnXCInXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdXRwdXQucHVzaChhc3QubmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dC5wdXNoKGFzdC5uYW1lLCAnPScpO1xuICAgICAgICAvLyBhc3QudmFsdWUgaXMgbXVzdGFjaGUgb3IgY29uY2F0XG4gICAgICAgIG91dHB1dC5wdXNoKGJ1aWxkKGFzdC52YWx1ZSwgb3B0aW9ucykpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQ29uY2F0U3RhdGVtZW50JzpcbiAgICAgIG91dHB1dC5wdXNoKCdcIicpO1xuICAgICAgYXN0LnBhcnRzLmZvckVhY2goKG5vZGU6IEFTVC5UZXh0Tm9kZSB8IEFTVC5NdXN0YWNoZVN0YXRlbWVudCkgPT4ge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnVGV4dE5vZGUnKSB7XG4gICAgICAgICAgb3V0cHV0LnB1c2gob3B0aW9ucy5lbnRpdHlFbmNvZGluZyA9PT0gJ3JhdycgPyBub2RlLmNoYXJzIDogZXNjYXBlQXR0clZhbHVlKG5vZGUuY2hhcnMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdXRwdXQucHVzaChidWlsZChub2RlLCBvcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb3V0cHV0LnB1c2goJ1wiJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdUZXh0Tm9kZSc6XG4gICAgICBvdXRwdXQucHVzaChvcHRpb25zLmVudGl0eUVuY29kaW5nID09PSAncmF3JyA/IGFzdC5jaGFycyA6IGVzY2FwZVRleHQoYXN0LmNoYXJzKSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdXN0YWNoZVN0YXRlbWVudCc6XG4gICAgICB7XG4gICAgICAgIG91dHB1dC5wdXNoKFxuICAgICAgICAgIGNvbXBhY3RKb2luKFtcbiAgICAgICAgICAgIGFzdC5lc2NhcGVkID8gJ3t7JyA6ICd7e3snLFxuICAgICAgICAgICAgYXN0LnN0cmlwLm9wZW4gPyAnficgOiBudWxsLFxuICAgICAgICAgICAgcGF0aFBhcmFtcyhhc3QpLFxuICAgICAgICAgICAgYXN0LnN0cmlwLmNsb3NlID8gJ34nIDogbnVsbCxcbiAgICAgICAgICAgIGFzdC5lc2NhcGVkID8gJ319JyA6ICd9fX0nLFxuICAgICAgICAgIF0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdXN0YWNoZUNvbW1lbnRTdGF0ZW1lbnQnOlxuICAgICAge1xuICAgICAgICBvdXRwdXQucHVzaChjb21wYWN0Sm9pbihbJ3t7IS0tJywgYXN0LnZhbHVlLCAnLS19fSddKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdFbGVtZW50TW9kaWZpZXJTdGF0ZW1lbnQnOlxuICAgICAge1xuICAgICAgICBvdXRwdXQucHVzaChjb21wYWN0Sm9pbihbJ3t7JywgcGF0aFBhcmFtcyhhc3QpLCAnfX0nXSkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUGF0aEV4cHJlc3Npb24nOlxuICAgICAgb3V0cHV0LnB1c2goYXN0Lm9yaWdpbmFsKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1N1YkV4cHJlc3Npb24nOlxuICAgICAge1xuICAgICAgICBvdXRwdXQucHVzaCgnKCcsIHBhdGhQYXJhbXMoYXN0KSwgJyknKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0Jvb2xlYW5MaXRlcmFsJzpcbiAgICAgIG91dHB1dC5wdXNoKGFzdC52YWx1ZSA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQmxvY2tTdGF0ZW1lbnQnOlxuICAgICAge1xuICAgICAgICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBpZiAoYXN0LmNoYWluZWQpIHtcbiAgICAgICAgICBsaW5lcy5wdXNoKFxuICAgICAgICAgICAgY29tcGFjdEpvaW4oW1xuICAgICAgICAgICAgICAne3snLFxuICAgICAgICAgICAgICBhc3QuaW52ZXJzZVN0cmlwLm9wZW4gPyAnficgOiBudWxsLFxuICAgICAgICAgICAgICAnZWxzZSAnLFxuICAgICAgICAgICAgICBwYXRoUGFyYW1zKGFzdCksXG4gICAgICAgICAgICAgIGFzdC5pbnZlcnNlU3RyaXAuY2xvc2UgPyAnficgOiBudWxsLFxuICAgICAgICAgICAgICAnfX0nLFxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpbmVzLnB1c2gob3BlbkJsb2NrKGFzdCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGluZXMucHVzaChidWlsZChhc3QucHJvZ3JhbSwgb3B0aW9ucykpO1xuXG4gICAgICAgIGlmIChhc3QuaW52ZXJzZSkge1xuICAgICAgICAgIGlmICghYXN0LmludmVyc2UuY2hhaW5lZCkge1xuICAgICAgICAgICAgbGluZXMucHVzaChcbiAgICAgICAgICAgICAgY29tcGFjdEpvaW4oW1xuICAgICAgICAgICAgICAgICd7eycsXG4gICAgICAgICAgICAgICAgYXN0LmludmVyc2VTdHJpcC5vcGVuID8gJ34nIDogbnVsbCxcbiAgICAgICAgICAgICAgICAnZWxzZScsXG4gICAgICAgICAgICAgICAgYXN0LmludmVyc2VTdHJpcC5jbG9zZSA/ICd+JyA6IG51bGwsXG4gICAgICAgICAgICAgICAgJ319JyxcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxpbmVzLnB1c2goYnVpbGQoYXN0LmludmVyc2UsIG9wdGlvbnMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYXN0LmNoYWluZWQpIHtcbiAgICAgICAgICBsaW5lcy5wdXNoKGNsb3NlQmxvY2soYXN0KSk7XG4gICAgICAgIH1cblxuICAgICAgICBvdXRwdXQucHVzaChsaW5lcy5qb2luKCcnKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdQYXJ0aWFsU3RhdGVtZW50JzpcbiAgICAgIHtcbiAgICAgICAgb3V0cHV0LnB1c2goY29tcGFjdEpvaW4oWyd7ez4nLCBwYXRoUGFyYW1zKGFzdCksICd9fSddKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdDb21tZW50U3RhdGVtZW50JzpcbiAgICAgIHtcbiAgICAgICAgb3V0cHV0LnB1c2goY29tcGFjdEpvaW4oWyc8IS0tJywgYXN0LnZhbHVlLCAnLS0+J10pKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1N0cmluZ0xpdGVyYWwnOlxuICAgICAge1xuICAgICAgICBvdXRwdXQucHVzaChgXCIke2FzdC52YWx1ZX1cImApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTnVtYmVyTGl0ZXJhbCc6XG4gICAgICB7XG4gICAgICAgIG91dHB1dC5wdXNoKFN0cmluZyhhc3QudmFsdWUpKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1VuZGVmaW5lZExpdGVyYWwnOlxuICAgICAge1xuICAgICAgICBvdXRwdXQucHVzaCgndW5kZWZpbmVkJyk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdOdWxsTGl0ZXJhbCc6XG4gICAgICB7XG4gICAgICAgIG91dHB1dC5wdXNoKCdudWxsJyk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdIYXNoJzpcbiAgICAgIHtcbiAgICAgICAgb3V0cHV0LnB1c2goXG4gICAgICAgICAgYXN0LnBhaXJzXG4gICAgICAgICAgICAubWFwKHBhaXIgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gYnVpbGQocGFpciwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJyAnKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnSGFzaFBhaXInOlxuICAgICAge1xuICAgICAgICBvdXRwdXQucHVzaChgJHthc3Qua2V5fT0ke2J1aWxkKGFzdC52YWx1ZSwgb3B0aW9ucyl9YCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiBjb21wYWN0KGFycmF5OiBPcHRpb248c3RyaW5nPltdKTogc3RyaW5nW10ge1xuICBjb25zdCBuZXdBcnJheTogYW55W10gPSBbXTtcbiAgYXJyYXkuZm9yRWFjaChhID0+IHtcbiAgICBpZiAodHlwZW9mIGEgIT09ICd1bmRlZmluZWQnICYmIGEgIT09IG51bGwgJiYgYSAhPT0gJycpIHtcbiAgICAgIG5ld0FycmF5LnB1c2goYSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG5ld0FycmF5O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==