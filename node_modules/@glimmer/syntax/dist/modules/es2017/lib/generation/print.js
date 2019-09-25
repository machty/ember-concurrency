import { voidMap } from '../parser/tokenizer-event-handlers';
import { escapeText, escapeAttrValue } from './util';
function unreachable() {
    throw new Error('unreachable');
}
export default function build(ast, options = { entityEncoding: 'transformed' }) {
    if (!ast) {
        return '';
    }
    if (options.override) {
        let result = options.override(ast, options);
        if (result !== undefined) {
            return result;
        }
    }
    function buildEach(asts) {
        return asts.map(node => build(node, options));
    }
    function pathParams(ast) {
        let path;
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
        const params = block.program.blockParams;
        if (params.length) {
            return ` as |${params.join(' ')}|`;
        }
        return null;
    }
    function openBlock(block) {
        return compactJoin(['{{', block.openStrip.open ? '~' : null, '#', pathParams(block), blockParams(block), block.openStrip.close ? '~' : null, '}}']);
    }
    function closeBlock(block) {
        return compactJoin(['{{', block.closeStrip.open ? '~' : null, '/', build(block.path, options), block.closeStrip.close ? '~' : null, '}}']);
    }
    const output = [];
    switch (ast.type) {
        case 'Program':
        case 'Block':
        case 'Template':
            {
                const chainBlock = ast.chained && ast.body[0];
                if (chainBlock) {
                    chainBlock.chained = true;
                }
                const body = buildEach(ast.body).join('');
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
                output.push(' ', 'as', ' ', `|${ast.blockParams.join(' ')}|`);
            }
            if (voidMap[ast.tag]) {
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
                    output.push('"', options.entityEncoding === 'raw' ? ast.value.chars : escapeAttrValue(ast.value.chars), '"');
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
            ast.parts.forEach(node => {
                if (node.type === 'TextNode') {
                    output.push(options.entityEncoding === 'raw' ? node.chars : escapeAttrValue(node.chars));
                } else {
                    output.push(build(node, options));
                }
            });
            output.push('"');
            break;
        case 'TextNode':
            output.push(options.entityEncoding === 'raw' ? ast.chars : escapeText(ast.chars));
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
                const lines = [];
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
                output.push(`"${ast.value}"`);
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
                output.push(ast.pairs.map(pair => {
                    return build(pair, options);
                }).join(' '));
            }
            break;
        case 'HashPair':
            {
                output.push(`${ast.key}=${build(ast.value, options)}`);
            }
            break;
    }
    return output.join('');
}
function compact(array) {
    const newArray = [];
    array.forEach(a => {
        if (typeof a !== 'undefined' && a !== null && a !== '') {
            newArray.push(a);
        }
    });
    return newArray;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3N5bnRheC9saWIvZ2VuZXJhdGlvbi9wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxTQUFTLE9BQVQsUUFBd0Isb0NBQXhCO0FBQ0EsU0FBUyxVQUFULEVBQXFCLGVBQXJCLFFBQTRDLFFBQTVDO0FBRUEsU0FBUyxXQUFULEdBQW9CO0FBQ2xCLFVBQU0sSUFBSSxLQUFKLENBQVUsYUFBVixDQUFOO0FBQ0Q7QUFzQkQsZUFBYyxTQUFVLEtBQVYsQ0FDWixHQURZLEVBRVosVUFBMEIsRUFBRSxnQkFBZ0IsYUFBbEIsRUFGZCxFQUUrQztBQUUzRCxRQUFJLENBQUMsR0FBTCxFQUFVO0FBQ1IsZUFBTyxFQUFQO0FBQ0Q7QUFFRCxRQUFJLFFBQVEsUUFBWixFQUFzQjtBQUNwQixZQUFJLFNBQVMsUUFBUSxRQUFSLENBQWlCLEdBQWpCLEVBQXNCLE9BQXRCLENBQWI7QUFFQSxZQUFJLFdBQVcsU0FBZixFQUEwQjtBQUN4QixtQkFBTyxNQUFQO0FBQ0Q7QUFDRjtBQUVELGFBQVMsU0FBVCxDQUFtQixJQUFuQixFQUFtQztBQUNqQyxlQUFPLEtBQUssR0FBTCxDQUFTLFFBQVEsTUFBTSxJQUFOLEVBQVksT0FBWixDQUFqQixDQUFQO0FBQ0Q7QUFFRCxhQUFTLFVBQVQsQ0FBb0IsR0FBcEIsRUFBaUM7QUFDL0IsWUFBSSxJQUFKO0FBRUEsZ0JBQVEsSUFBSSxJQUFaO0FBQ0UsaUJBQUssbUJBQUw7QUFDQSxpQkFBSyxlQUFMO0FBQ0EsaUJBQUssMEJBQUw7QUFDQSxpQkFBSyxnQkFBTDtBQUNFLHVCQUFPLE1BQU0sSUFBSSxJQUFWLEVBQWdCLE9BQWhCLENBQVA7QUFDQTtBQUNGLGlCQUFLLGtCQUFMO0FBQ0UsdUJBQU8sTUFBTSxJQUFJLElBQVYsRUFBZ0IsT0FBaEIsQ0FBUDtBQUNBO0FBQ0Y7QUFDRSx1QkFBTyxhQUFQO0FBWEo7QUFjQSxlQUFPLFlBQVksQ0FBQyxJQUFELEVBQU8s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LE1BQU0sRUFBcEQsRUFBd0Q7QUFDdEQscUJBQVMsSUFBVCxDQUFjLENBQWQ7QUFDRDtBQUNGLEtBSkQ7QUFLQSxXQUFPLFFBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wdGlvbiB9IGZyb20gJ0BnbGltbWVyL2ludGVyZmFjZXMnO1xuaW1wb3J0ICogYXMgQVNUIGZyb20gJy4uL3R5cGVzL25vZGVzJztcbmltcG9ydCB7IHZvaWRNYXAgfSBmcm9tICcuLi9wYXJzZXIvdG9rZW5pemVyLWV2ZW50LWhhbmRsZXJzJztcbmltcG9ydCB7IGVzY2FwZVRleHQsIGVzY2FwZUF0dHJWYWx1ZSB9IGZyb20gJy4vdXRpbCc7XG5cbmZ1bmN0aW9uIHVucmVhY2hhYmxlKCk6IG5ldmVyIHtcbiAgdGhyb3cgbmV3IEVycm9yKCd1bnJlYWNoYWJsZScpO1xufVxuXG5pbnRlcmZhY2UgUHJpbnRlck9wdGlvbnMge1xuICBlbnRpdHlFbmNvZGluZzogJ3RyYW5zZm9ybWVkJyB8ICdyYXcnO1xuXG4gIC8qKlxuICAgKiBVc2VkIHRvIG92ZXJyaWRlIHRoZSBtZWNoYW5pc20gb2YgcHJpbnRpbmcgYSBnaXZlbiBBU1QuTm9kZS5cbiAgICpcbiAgICogVGhpcyB3aWxsIGdlbmVyYWxseSBvbmx5IGJlIHVzZWZ1bCB0byBzb3VyY2UgLT4gc291cmNlIGNvZGVtb2RzXG4gICAqIHdoZXJlIHlvdSB3b3VsZCBsaWtlIHRvIHNwZWNpYWxpemUvb3ZlcnJpZGUgdGhlIHdheSBhIGdpdmVuIG5vZGUgaXNcbiAgICogcHJpbnRlZCAoZS5nLiB5b3Ugd291bGQgbGlrZSB0byBwcmVzZXJ2ZSBhcyBtdWNoIG9mIHRoZSBvcmlnaW5hbFxuICAgKiBmb3JtYXR0aW5nIGFzIHBvc3NpYmxlKS5cbiAgICpcbiAgICogV2hlbiB0aGUgcHJvdmlkZWQgb3ZlcnJpZGUgcmV0dXJucyB1bmRlZmluZWQsIHRoZSBkZWZhdWx0IGJ1aWx0IGluIHByaW50aW5nXG4gICAqIHdpbGwgYmUgZG9uZSBmb3IgdGhlIEFTVC5Ob2RlLlxuICAgKlxuICAgKiBAcGFyYW0gYXN0IHRoZSBhc3Qgbm9kZSB0byBiZSBwcmludGVkXG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIHNwZWNpZmllZCBkdXJpbmcgdGhlIHByaW50KCkgaW52b2NhdGlvblxuICAgKi9cbiAgb3ZlcnJpZGU/KGFzdDogQVNULk5vZGUsIG9wdGlvbnM6IFByaW50ZXJPcHRpb25zKTogdm9pZCB8IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGQoXG4gIGFzdDogQVNULk5vZGUsXG4gIG9wdGlvbnM6IFByaW50ZXJPcHRpb25zID0geyBlbnRpdHlFbmNvZGluZzogJ3RyYW5zZm9ybWVkJyB9XG4pOiBzdHJpbmcge1xuICBpZiAoIWFzdCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmIChvcHRpb25zLm92ZXJyaWRlKSB7XG4gICAgbGV0IHJlc3VsdCA9IG9wdGlvbnMub3ZlcnJpZGUoYXN0LCBvcHRpb25zKTtcblxuICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZEVhY2goYXN0czogQVNULk5vZGVbXSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gYXN0cy5tYXAobm9kZSA9PiBidWlsZChub2RlLCBvcHRpb25zKSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXRoUGFyYW1zKGFzdDogQVNULk5vZGUpOiBzdHJpbmcge1xuICAgIGxldCBwYXRoOiBzdHJpbmc7XG5cbiAgICBzd2l0Y2ggKGFzdC50eXBlKSB7XG4gICAgICBjYXNlICdNdXN0YWNoZVN0YXRlbWVudCc6XG4gICAgICBjYXNlICdTdWJFeHByZXNzaW9uJzpcbiAgICAgIGNhc2UgJ0VsZW1lbnRNb2RpZmllclN0YXRlbWVudCc6XG4gICAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICAgIHBhdGggPSBidWlsZChhc3QucGF0aCwgb3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGFydGlhbFN0YXRlbWVudCc6XG4gICAgICAgIHBhdGggPSBidWlsZChhc3QubmFtZSwgb3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHVucmVhY2hhYmxlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBhY3RKb2luKFtwYXRoLCBidWlsZEVhY2goYXN0LnBhcmFtcykuam9pbignICcpLCBidWlsZChhc3QuaGFzaCwgb3B0aW9ucyldLCAnICcpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcGFjdEpvaW4oYXJyYXk6IE9wdGlvbjxzdHJpbmc+W10sIGRlbGltaXRlcj86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNvbXBhY3QoYXJyYXkpLmpvaW4oZGVsaW1pdGVyIHx8ICcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJsb2NrUGFyYW1zKGJsb2NrOiBBU1QuQmxvY2tTdGF0ZW1lbnQpOiBPcHRpb248c3RyaW5nPiB7XG4gICAgY29uc3QgcGFyYW1zID0gYmxvY2sucHJvZ3JhbS5ibG9ja1BhcmFtcztcbiAgICBpZiAocGFyYW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGAgYXMgfCR7cGFyYW1zLmpvaW4oJyAnKX18YDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5CbG9jayhibG9jazogQVNULkJsb2NrU3RhdGVtZW50KTogc3RyaW5nIHtcbiAgICByZXR1cm4gY29tcGFjdEpvaW4oW1xuICAgICAgJ3t7JyxcbiAgICAgIGJsb2NrLm9wZW5TdHJpcC5vcGVuID8gJ34nIDogbnVsbCxcbiAgICAgICcjJyxcbiAgICAgIHBhdGhQYXJhbXMoYmxvY2spLFxuICAgICAgYmxvY2tQYXJhbXMoYmxvY2spLFxuICAgICAgYmxvY2sub3BlblN0cmlwLmNsb3NlID8gJ34nIDogbnVsbCxcbiAgICAgICd9fScsXG4gICAgXSk7XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZUJsb2NrKGJsb2NrOiBBU1QuQmxvY2tTdGF0ZW1lbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb21wYWN0Sm9pbihbXG4gICAgICAne3snLFxuICAgICAgYmxvY2suY2xvc2VTdHJpcC5vcGVuID8gJ34nIDogbnVsbCxcbiAgICAgICcvJyxcbiAgICAgIGJ1aWxkKGJsb2NrLnBhdGgsIG9wdGlvbnMpLFxuICAgICAgYmxvY2suY2xvc2VTdHJpcC5jbG9zZSA/ICd+JyA6IG51bGwsXG4gICAgICAnfX0nLFxuICAgIF0pO1xuICB9XG5cbiAgY29uc3Qgb3V0cHV0OiBzdHJpbmdbXSA9IFtdO1xuXG4gIHN3aXRjaCAoYXN0LnR5cGUpIHtcbiAgICBjYXNlICdQcm9ncmFtJzpcbiAgICBjYXNlICdCbG9jayc6XG4gICAgY2FzZSAnVGVtcGxhdGUnOlxuICAgICAge1xuICAgICAgICBjb25zdCBjaGFpbkJsb2NrID0gYXN0LmNoYWluZWQgJiYgYXN0LmJvZHlbMF07XG4gICAgICAgIGlmIChjaGFpbkJsb2NrKSB7XG4gICAgICAgICAgKGNoYWluQmxvY2sgYXMgQVNULkJsb2NrU3RhdGVtZW50KS5jaGFpbmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib2R5ID0gYnVpbGRFYWNoKGFzdC5ib2R5KS5qb2luKCcnKTtcbiAgICAgICAgb3V0cHV0LnB1c2goYm9keSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdFbGVtZW50Tm9kZSc6XG4gICAgICBvdXRwdXQucHVzaCgnPCcsIGFzdC50YWcpO1xuICAgICAgaWYgKGFzdC5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICBvdXRwdXQucHVzaCgnICcsIGJ1aWxkRWFjaChhc3QuYXR0cmlidXRlcykuam9pbignICcpKTtcbiAgICAgIH1cbiAgICAgIGlmIChhc3QubW9kaWZpZXJzLmxlbmd0aCkge1xuICAgICAgICBvdXRwdXQucHVzaCgnICcsIGJ1aWxkRWFjaChhc3QubW9kaWZpZXJzKS5qb2luKCcgJykpO1xuICAgICAgfVxuICAgICAgaWYgKGFzdC5jb21tZW50cy5sZW5ndGgpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goJyAnLCBidWlsZEVhY2goYXN0LmNvbW1lbnRzKS5qb2luKCcgJykpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXN0LmJsb2NrUGFyYW1zLmxlbmd0aCkge1xuICAgICAgICBvdXRwdXQucHVzaCgnICcsICdhcycsICcgJywgYHwke2FzdC5ibG9ja1BhcmFtcy5qb2luKCcgJyl9fGApO1xuICAgICAgfVxuXG4gICAgICBpZiAodm9pZE1hcFthc3QudGFnXSkge1xuICAgICAgICBpZiAoYXN0LnNlbGZDbG9zaW5nKSB7XG4gICAgICAgICAgb3V0cHV0LnB1c2goJyAvJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvdXRwdXQucHVzaCgnPicpO1xuICAgICAgfSBlbHNlIGlmIChhc3Quc2VsZkNsb3NpbmcpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goJyAvPicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0LnB1c2goJz4nKTtcbiAgICAgICAgb3V0cHV0LnB1c2guYXBwbHkob3V0cHV0LCBidWlsZEVhY2goYXN0LmNoaWxkcmVuKSk7XG4gICAgICAgIG91dHB1dC5wdXNoKCc8LycsIGFzdC50YWcsICc+Jyk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdBdHRyTm9kZSc6XG4gICAgICBpZiAoYXN0LnZhbHVlLnR5cGUgPT09ICdUZXh0Tm9kZScpIHtcbiAgICAgICAgaWYgKGFzdC52YWx1ZS5jaGFycyAhPT0gJycpIHtcbiAgICAgICAgICBvdXRwdXQucHVzaChhc3QubmFtZSwgJz0nKTtcbiAgICAgICAgICBvdXRwdXQucHVzaChcbiAgICAgICAgICAgICdcIicsXG4gICAgICAgICAgICBvcHRpb25zLmVudGl0eUVuY29kaW5nID09PSAncmF3JyA/IGFzdC52YWx1ZS5jaGFycyA6IGVzY2FwZUF0dHJWYWx1ZShhc3QudmFsdWUuY2hhcnMpLFxuICAgICAgICAgICAgJ1wiJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3V0cHV0LnB1c2goYXN0Lm5hbWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQucHVzaChhc3QubmFtZSwgJz0nKTtcbiAgICAgICAgLy8gYXN0LnZhbHVlIGlzIG11c3RhY2hlIG9yIGNvbmNhdFxuICAgICAgICBvdXRwdXQucHVzaChidWlsZChhc3QudmFsdWUsIG9wdGlvbnMpKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0NvbmNhdFN0YXRlbWVudCc6XG4gICAgICBvdXRwdXQucHVzaCgnXCInKTtcbiAgICAgIGFzdC5wYXJ0cy5mb3JFYWNoKChub2RlOiBBU1QuVGV4dE5vZGUgfCBBU1QuTXVzdGFjaGVTdGF0ZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1RleHROb2RlJykge1xuICAgICAgICAgIG91dHB1dC5wdXNoKG9wdGlvbnMuZW50aXR5RW5jb2RpbmcgPT09ICdyYXcnID8gbm9kZS5jaGFycyA6IGVzY2FwZUF0dHJWYWx1ZShub2RlLmNoYXJzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3V0cHV0LnB1c2goYnVpbGQobm9kZSwgb3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG91dHB1dC5wdXNoKCdcIicpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnVGV4dE5vZGUnOlxuICAgICAgb3V0cHV0LnB1c2gob3B0aW9ucy5lbnRpdHlFbmNvZGluZyA9PT0gJ3JhdycgPyBhc3QuY2hhcnMgOiBlc2NhcGVUZXh0KGFzdC5jaGFycykpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVzdGFjaGVTdGF0ZW1lbnQnOlxuICAgICAge1xuICAgICAgICBvdXRwdXQucHVzaChcbiAgICAgICAgICBjb21wYWN0Sm9pbihbXG4gICAgICAgICAgICBhc3QuZXNjYXBlZCA/ICd7eycgOiAne3t7JyxcbiAgICAgICAgICAgIGFzdC5zdHJpcC5vcGVuID8gJ34nIDogbnVsbCxcbiAgICAgICAgICAgIHBhdGhQYXJhbXMoYXN0KSxcbiAgICAgICAgICAgIGFzdC5zdHJpcC5jbG9zZSA/ICd+JyA6IG51bGwsXG4gICAgICAgICAgICBhc3QuZXNjYXBlZCA/ICd9fScgOiAnfX19JyxcbiAgICAgICAgICBdKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVzdGFjaGVDb21tZW50U3RhdGVtZW50JzpcbiAgICAgIHtcbiAgICAgICAgb3V0cHV0LnB1c2goY29tcGFjdEpvaW4oWyd7eyEtLScsIGFzdC52YWx1ZSwgJy0tfX0nXSkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRWxlbWVudE1vZGlmaWVyU3RhdGVtZW50JzpcbiAgICAgIHtcbiAgICAgICAgb3V0cHV0LnB1c2goY29tcGFjdEpvaW4oWyd7eycsIHBhdGhQYXJhbXMoYXN0KSwgJ319J10pKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1BhdGhFeHByZXNzaW9uJzpcbiAgICAgIG91dHB1dC5wdXNoKGFzdC5vcmlnaW5hbCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdTdWJFeHByZXNzaW9uJzpcbiAgICAgIHtcbiAgICAgICAgb3V0cHV0LnB1c2goJygnLCBwYXRoUGFyYW1zKGFzdCksICcpJyk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdCb29sZWFuTGl0ZXJhbCc6XG4gICAgICBvdXRwdXQucHVzaChhc3QudmFsdWUgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0Jsb2NrU3RhdGVtZW50JzpcbiAgICAgIHtcbiAgICAgICAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgaWYgKGFzdC5jaGFpbmVkKSB7XG4gICAgICAgICAgbGluZXMucHVzaChcbiAgICAgICAgICAgIGNvbXBhY3RKb2luKFtcbiAgICAgICAgICAgICAgJ3t7JyxcbiAgICAgICAgICAgICAgYXN0LmludmVyc2VTdHJpcC5vcGVuID8gJ34nIDogbnVsbCxcbiAgICAgICAgICAgICAgJ2Vsc2UgJyxcbiAgICAgICAgICAgICAgcGF0aFBhcmFtcyhhc3QpLFxuICAgICAgICAgICAgICBhc3QuaW52ZXJzZVN0cmlwLmNsb3NlID8gJ34nIDogbnVsbCxcbiAgICAgICAgICAgICAgJ319JyxcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaW5lcy5wdXNoKG9wZW5CbG9jayhhc3QpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpbmVzLnB1c2goYnVpbGQoYXN0LnByb2dyYW0sIG9wdGlvbnMpKTtcblxuICAgICAgICBpZiAoYXN0LmludmVyc2UpIHtcbiAgICAgICAgICBpZiAoIWFzdC5pbnZlcnNlLmNoYWluZWQpIHtcbiAgICAgICAgICAgIGxpbmVzLnB1c2goXG4gICAgICAgICAgICAgIGNvbXBhY3RKb2luKFtcbiAgICAgICAgICAgICAgICAne3snLFxuICAgICAgICAgICAgICAgIGFzdC5pbnZlcnNlU3RyaXAub3BlbiA/ICd+JyA6IG51bGwsXG4gICAgICAgICAgICAgICAgJ2Vsc2UnLFxuICAgICAgICAgICAgICAgIGFzdC5pbnZlcnNlU3RyaXAuY2xvc2UgPyAnficgOiBudWxsLFxuICAgICAgICAgICAgICAgICd9fScsXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsaW5lcy5wdXNoKGJ1aWxkKGFzdC5pbnZlcnNlLCBvcHRpb25zKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWFzdC5jaGFpbmVkKSB7XG4gICAgICAgICAgbGluZXMucHVzaChjbG9zZUJsb2NrKGFzdCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgb3V0cHV0LnB1c2gobGluZXMuam9pbignJykpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUGFydGlhbFN0YXRlbWVudCc6XG4gICAgICB7XG4gICAgICAgIG91dHB1dC5wdXNoKGNvbXBhY3RKb2luKFsne3s+JywgcGF0aFBhcmFtcyhhc3QpLCAnfX0nXSkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQ29tbWVudFN0YXRlbWVudCc6XG4gICAgICB7XG4gICAgICAgIG91dHB1dC5wdXNoKGNvbXBhY3RKb2luKFsnPCEtLScsIGFzdC52YWx1ZSwgJy0tPiddKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdTdHJpbmdMaXRlcmFsJzpcbiAgICAgIHtcbiAgICAgICAgb3V0cHV0LnB1c2goYFwiJHthc3QudmFsdWV9XCJgKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ051bWJlckxpdGVyYWwnOlxuICAgICAge1xuICAgICAgICBvdXRwdXQucHVzaChTdHJpbmcoYXN0LnZhbHVlKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdVbmRlZmluZWRMaXRlcmFsJzpcbiAgICAgIHtcbiAgICAgICAgb3V0cHV0LnB1c2goJ3VuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTnVsbExpdGVyYWwnOlxuICAgICAge1xuICAgICAgICBvdXRwdXQucHVzaCgnbnVsbCcpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnSGFzaCc6XG4gICAgICB7XG4gICAgICAgIG91dHB1dC5wdXNoKFxuICAgICAgICAgIGFzdC5wYWlyc1xuICAgICAgICAgICAgLm1hcChwYWlyID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkKHBhaXIsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcgJylcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0hhc2hQYWlyJzpcbiAgICAgIHtcbiAgICAgICAgb3V0cHV0LnB1c2goYCR7YXN0LmtleX09JHtidWlsZChhc3QudmFsdWUsIG9wdGlvbnMpfWApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gY29tcGFjdChhcnJheTogT3B0aW9uPHN0cmluZz5bXSk6IHN0cmluZ1tdIHtcbiAgY29uc3QgbmV3QXJyYXk6IGFueVtdID0gW107XG4gIGFycmF5LmZvckVhY2goYSA9PiB7XG4gICAgaWYgKHR5cGVvZiBhICE9PSAndW5kZWZpbmVkJyAmJiBhICE9PSBudWxsICYmIGEgIT09ICcnKSB7XG4gICAgICBuZXdBcnJheS5wdXNoKGEpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBuZXdBcnJheTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=