import SyntaxError from './errors/syntax-error';
// Regex to validate the identifier for block parameters.
// Based on the ID validation regex in Handlebars.
let ID_INVERSE_PATTERN = /[!"#%-,\.\/;->@\[-\^`\{-~]/;
// Checks the element's attributes to see if it uses block params.
// If it does, registers the block params with the program and
// removes the corresponding attributes from the element.
export function parseElementBlockParams(element) {
    let params = parseBlockParams(element);
    if (params) element.blockParams = params;
}
function parseBlockParams(element) {
    let l = element.attributes.length;
    let attrNames = [];
    for (let i = 0; i < l; i++) {
        attrNames.push(element.attributes[i].name);
    }
    let asIndex = attrNames.indexOf('as');
    if (asIndex !== -1 && l > asIndex && attrNames[asIndex + 1].charAt(0) === '|') {
        // Some basic validation, since we're doing the parsing ourselves
        let paramsString = attrNames.slice(asIndex).join(' ');
        if (paramsString.charAt(paramsString.length - 1) !== '|' || paramsString.match(/\|/g).length !== 2) {
            throw new SyntaxError("Invalid block parameters syntax: '" + paramsString + "'", element.loc);
        }
        let params = [];
        for (let i = asIndex + 1; i < l; i++) {
            let param = attrNames[i].replace(/\|/g, '');
            if (param !== '') {
                if (ID_INVERSE_PATTERN.test(param)) {
                    throw new SyntaxError("Invalid identifier for block parameters: '" + param + "' in '" + paramsString + "'", element.loc);
                }
                params.push(param);
            }
        }
        if (params.length === 0) {
            throw new SyntaxError("Cannot use zero block parameters: '" + paramsString + "'", element.loc);
        }
        element.attributes = element.attributes.slice(0, asIndex);
        return params;
    }
    return null;
}
export function childrenFor(node) {
    switch (node.type) {
        case 'Block':
        case 'Template':
            return node.body;
        case 'ElementNode':
            return node.children;
    }
}
export function appendChild(parent, node) {
    childrenFor(parent).push(node);
}
export function isLiteral(path) {
    return path.type === 'StringLiteral' || path.type === 'BooleanLiteral' || path.type === 'NumberLiteral' || path.type === 'NullLiteral' || path.type === 'UndefinedLiteral';
}
export function printLiteral(literal) {
    if (literal.type === 'UndefinedLiteral') {
        return 'undefined';
    } else {
        return JSON.stringify(literal.value);
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3N5bnRheC9saWIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxXQUFQLE1BQXdCLHVCQUF4QjtBQUVBO0FBQ0E7QUFFQSxJQUFJLHFCQUFxQiw0QkFBekI7QUFFQTtBQUNBO0FBQ0E7QUFFQSxPQUFNLFNBQVUsdUJBQVYsQ0FBa0MsT0FBbEMsRUFBMEQ7QUFDOUQsUUFBSSxTQUFTLGlCQUFpQixPQUFqQixDQUFiO0FBQ0EsUUFBSSxNQUFKLEVBQVksUUFBUSxXQUFSLEdBQXNCLE1BQXRCO0FBQ2I7QUFFRCxTQUFTLGdCQUFULENBQTBCLE9BQTFCLEVBQWtEO0FBQ2hELFFBQUksSUFBSSxRQUFRLFVBQVIsQ0FBbUIsTUFBM0I7QUFDQSxRQUFJLFlBQVksRUFBaEI7QUFFQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsR0FBdkIsRUFBNEI7QUFDMUIsa0JBQVUsSUFBVixDQUFlLFFBQVEsVUFBUixDQUFtQixDQUFuQixFQUFzQixJQUFyQztBQUNEO0FBRUQsUUFBSSxVQUFVLFVBQVUsT0FBVixDQUFrQixJQUFsQixDQUFkO0FBRUEsUUFBSSxZQUFZLENBQUMsQ0FBYixJQUFrQixJQUFJLE9BQXRCLElBQWlDLFVBQVUsVUFBVSxDQUFwQixFQUF1QixNQUF2QixDQUE4QixDQUE5QixNQUFxQyxHQUExRSxFQUErRTtBQUM3RTtBQUNBLFlBQUksZUFBZSxVQUFVLEtBQVYsQ0FBZ0IsT0FBaEIsRUFBeUIsSUFBekIsQ0FBOEIsR0FBOUIsQ0FBbkI7QUFDQSxZQUNFLGFBQWEsTUFBYixDQUFvQixhQUFhLE1BQWIsR0FBc0IsQ0FBMUMsTUFBaUQsR0FBakQsSUFDQSxhQUFhLEtBQWIsQ0FBbUIsS0FBbkIsRUFBMkIsTUFBM0IsS0FBc0MsQ0FGeEMsRUFHRTtBQUNBLGtCQUFNLElBQUksV0FBSixDQUFnQix1Q0FBdUMsWUFBdkMsR0FBc0QsR0FBdEUsRUFBMkUsUUFBUSxHQUFuRixDQUFOO0FBQ0Q7QUFFRCxZQUFJLFNBQVMsRUFBYjtBQUNBLGFBQUssSUFBSSxJQUFJLFVBQVUsQ0FBdkIsRUFBMEIsSUFBSSxDQUE5QixFQUFpQyxHQUFqQyxFQUFzQztBQUNwQyxnQkFBSSxRQUFRLFVBQVUsQ0FBVixFQUFhLE9BQWIsQ0FBcUIsS0FBckIsRUFBNEIsRUFBNUIsQ0FBWjtBQUNBLGdCQUFJLFVBQVUsRUFBZCxFQUFrQjtBQUNoQixvQkFBSSxtQkFBbUIsSUFBbkIsQ0FBd0IsS0FBeEIsQ0FBSixFQUFvQztBQUNsQywwQkFBTSxJQUFJLFdBQUosQ0FDSiwrQ0FBK0MsS0FBL0MsR0FBdUQsUUFBdkQsR0FBa0UsWUFBbEUsR0FBaUYsR0FEN0UsRUFFSixRQUFRLEdBRkosQ0FBTjtBQUlEO0FBQ0QsdUJBQU8sSUFBUCxDQUFZLEtBQVo7QUFDRDtBQUNGO0FBRUQsWUFBSSxPQUFPLE1BQVAsS0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkIsa0JBQU0sSUFBSSxXQUFKLENBQ0osd0NBQXdDLFlBQXhDLEdBQXVELEdBRG5ELEVBRUosUUFBUSxHQUZKLENBQU47QUFJRDtBQUVELGdCQUFRLFVBQVIsR0FBcUIsUUFBUSxVQUFSLENBQW1CLEtBQW5CLENBQXlCLENBQXpCLEVBQTRCLE9BQTVCLENBQXJCO0FBQ0EsZUFBTyxNQUFQO0FBQ0Q7QUFFRCxXQUFPLElBQVA7QUFDRDtBQUVELE9BQU0sU0FBVSxXQUFWLENBQ0osSUFESSxFQUM0QztBQUVoRCxZQUFRLEtBQUssSUFBYjtBQUNFLGFBQUssT0FBTDtBQUNBLGFBQUssVUFBTDtBQUNFLG1CQUFPLEtBQUssSUFBWjtBQUNGLGFBQUssYUFBTDtBQUNFLG1CQUFPLEtBQUssUUFBWjtBQUxKO0FBT0Q7QUFFRCxPQUFNLFNBQVUsV0FBVixDQUNKLE1BREksRUFFSixJQUZJLEVBRWU7QUFFbkIsZ0JBQVksTUFBWixFQUFvQixJQUFwQixDQUF5QixJQUF6QjtBQUNEO0FBRUQsT0FBTSxTQUFVLFNBQVYsQ0FDSixJQURJLEVBQ3FFO0FBRXpFLFdBQ0UsS0FBSyxJQUFMLEtBQWMsZUFBZCxJQUNBLEtBQUssSUFBTCxLQUFjLGdCQURkLElBRUEsS0FBSyxJQUFMLEtBQWMsZUFGZCxJQUdBLEtBQUssSUFBTCxLQUFjLGFBSGQsSUFJQSxLQUFLLElBQUwsS0FBYyxrQkFMaEI7QUFPRDtBQUVELE9BQU0sU0FBVSxZQUFWLENBQXVCLE9BQXZCLEVBQTJDO0FBQy9DLFFBQUksUUFBUSxJQUFSLEtBQWlCLGtCQUFyQixFQUF5QztBQUN2QyxlQUFPLFdBQVA7QUFDRCxLQUZELE1BRU87QUFDTCxlQUFPLEtBQUssU0FBTCxDQUFlLFFBQVEsS0FBdkIsQ0FBUDtBQUNEO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBU1QgZnJvbSAnLi90eXBlcy9ub2Rlcyc7XG5pbXBvcnQgKiBhcyBIQlMgZnJvbSAnLi90eXBlcy9oYW5kbGViYXJzLWFzdCc7XG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICdAZ2xpbW1lci9pbnRlcmZhY2VzJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuL2Vycm9ycy9zeW50YXgtZXJyb3InO1xuXG4vLyBSZWdleCB0byB2YWxpZGF0ZSB0aGUgaWRlbnRpZmllciBmb3IgYmxvY2sgcGFyYW1ldGVycy5cbi8vIEJhc2VkIG9uIHRoZSBJRCB2YWxpZGF0aW9uIHJlZ2V4IGluIEhhbmRsZWJhcnMuXG5cbmxldCBJRF9JTlZFUlNFX1BBVFRFUk4gPSAvWyFcIiMlLSxcXC5cXC87LT5AXFxbLVxcXmBcXHstfl0vO1xuXG4vLyBDaGVja3MgdGhlIGVsZW1lbnQncyBhdHRyaWJ1dGVzIHRvIHNlZSBpZiBpdCB1c2VzIGJsb2NrIHBhcmFtcy5cbi8vIElmIGl0IGRvZXMsIHJlZ2lzdGVycyB0aGUgYmxvY2sgcGFyYW1zIHdpdGggdGhlIHByb2dyYW0gYW5kXG4vLyByZW1vdmVzIHRoZSBjb3JyZXNwb25kaW5nIGF0dHJpYnV0ZXMgZnJvbSB0aGUgZWxlbWVudC5cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRWxlbWVudEJsb2NrUGFyYW1zKGVsZW1lbnQ6IEFTVC5FbGVtZW50Tm9kZSkge1xuICBsZXQgcGFyYW1zID0gcGFyc2VCbG9ja1BhcmFtcyhlbGVtZW50KTtcbiAgaWYgKHBhcmFtcykgZWxlbWVudC5ibG9ja1BhcmFtcyA9IHBhcmFtcztcbn1cblxuZnVuY3Rpb24gcGFyc2VCbG9ja1BhcmFtcyhlbGVtZW50OiBBU1QuRWxlbWVudE5vZGUpOiBPcHRpb248c3RyaW5nW10+IHtcbiAgbGV0IGwgPSBlbGVtZW50LmF0dHJpYnV0ZXMubGVuZ3RoO1xuICBsZXQgYXR0ck5hbWVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBhdHRyTmFtZXMucHVzaChlbGVtZW50LmF0dHJpYnV0ZXNbaV0ubmFtZSk7XG4gIH1cblxuICBsZXQgYXNJbmRleCA9IGF0dHJOYW1lcy5pbmRleE9mKCdhcycpO1xuXG4gIGlmIChhc0luZGV4ICE9PSAtMSAmJiBsID4gYXNJbmRleCAmJiBhdHRyTmFtZXNbYXNJbmRleCArIDFdLmNoYXJBdCgwKSA9PT0gJ3wnKSB7XG4gICAgLy8gU29tZSBiYXNpYyB2YWxpZGF0aW9uLCBzaW5jZSB3ZSdyZSBkb2luZyB0aGUgcGFyc2luZyBvdXJzZWx2ZXNcbiAgICBsZXQgcGFyYW1zU3RyaW5nID0gYXR0ck5hbWVzLnNsaWNlKGFzSW5kZXgpLmpvaW4oJyAnKTtcbiAgICBpZiAoXG4gICAgICBwYXJhbXNTdHJpbmcuY2hhckF0KHBhcmFtc1N0cmluZy5sZW5ndGggLSAxKSAhPT0gJ3wnIHx8XG4gICAgICBwYXJhbXNTdHJpbmcubWF0Y2goL1xcfC9nKSEubGVuZ3RoICE9PSAyXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJJbnZhbGlkIGJsb2NrIHBhcmFtZXRlcnMgc3ludGF4OiAnXCIgKyBwYXJhbXNTdHJpbmcgKyBcIidcIiwgZWxlbWVudC5sb2MpO1xuICAgIH1cblxuICAgIGxldCBwYXJhbXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gYXNJbmRleCArIDE7IGkgPCBsOyBpKyspIHtcbiAgICAgIGxldCBwYXJhbSA9IGF0dHJOYW1lc1tpXS5yZXBsYWNlKC9cXHwvZywgJycpO1xuICAgICAgaWYgKHBhcmFtICE9PSAnJykge1xuICAgICAgICBpZiAoSURfSU5WRVJTRV9QQVRURVJOLnRlc3QocGFyYW0pKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFxuICAgICAgICAgICAgXCJJbnZhbGlkIGlkZW50aWZpZXIgZm9yIGJsb2NrIHBhcmFtZXRlcnM6ICdcIiArIHBhcmFtICsgXCInIGluICdcIiArIHBhcmFtc1N0cmluZyArIFwiJ1wiLFxuICAgICAgICAgICAgZWxlbWVudC5sb2NcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHBhcmFtcy5wdXNoKHBhcmFtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFxuICAgICAgICBcIkNhbm5vdCB1c2UgemVybyBibG9jayBwYXJhbWV0ZXJzOiAnXCIgKyBwYXJhbXNTdHJpbmcgKyBcIidcIixcbiAgICAgICAgZWxlbWVudC5sb2NcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5hdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzLnNsaWNlKDAsIGFzSW5kZXgpO1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkcmVuRm9yKFxuICBub2RlOiBBU1QuQmxvY2sgfCBBU1QuVGVtcGxhdGUgfCBBU1QuRWxlbWVudE5vZGVcbik6IEFTVC5Ub3BMZXZlbFN0YXRlbWVudFtdIHtcbiAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICBjYXNlICdCbG9jayc6XG4gICAgY2FzZSAnVGVtcGxhdGUnOlxuICAgICAgcmV0dXJuIG5vZGUuYm9keTtcbiAgICBjYXNlICdFbGVtZW50Tm9kZSc6XG4gICAgICByZXR1cm4gbm9kZS5jaGlsZHJlbjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGQoXG4gIHBhcmVudDogQVNULkJsb2NrIHwgQVNULlRlbXBsYXRlIHwgQVNULkVsZW1lbnROb2RlLFxuICBub2RlOiBBU1QuU3RhdGVtZW50XG4pIHtcbiAgY2hpbGRyZW5Gb3IocGFyZW50KS5wdXNoKG5vZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaXRlcmFsKFxuICBwYXRoOiBBU1QuUGF0aEV4cHJlc3Npb24gfCBIQlMuUGF0aEV4cHJlc3Npb24gfCBBU1QuTGl0ZXJhbCB8IEhCUy5MaXRlcmFsXG4pOiBwYXRoIGlzIEFTVC5MaXRlcmFsIHtcbiAgcmV0dXJuIChcbiAgICBwYXRoLnR5cGUgPT09ICdTdHJpbmdMaXRlcmFsJyB8fFxuICAgIHBhdGgudHlwZSA9PT0gJ0Jvb2xlYW5MaXRlcmFsJyB8fFxuICAgIHBhdGgudHlwZSA9PT0gJ051bWJlckxpdGVyYWwnIHx8XG4gICAgcGF0aC50eXBlID09PSAnTnVsbExpdGVyYWwnIHx8XG4gICAgcGF0aC50eXBlID09PSAnVW5kZWZpbmVkTGl0ZXJhbCdcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50TGl0ZXJhbChsaXRlcmFsOiBBU1QuTGl0ZXJhbCk6IHN0cmluZyB7XG4gIGlmIChsaXRlcmFsLnR5cGUgPT09ICdVbmRlZmluZWRMaXRlcmFsJykge1xuICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobGl0ZXJhbC52YWx1ZSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=