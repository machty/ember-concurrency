/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:html:compilers
 * @fileoverview Compilers to transform mdast nodes to HTML.
 */

'use strict';

/*
 * Dependencies.
 */

var trim = require('trim');
var detab = require('detab');
var collapse = require('collapse-white-space');
var normalizeURI = require('normalize-uri');
var trimLines = require('trim-lines');
var visit = require('unist-util-visit');
var h = require('./h.js');

/*
 * Compilers.
 */

var visitors = {};

/**
 * Return the content of a reference without definition
 * as markdown.
 *
 * @example
 *   failsafe({
 *     identifier: 'foo',
 *     referenceType: 'shortcut',
 *     children: [
 *       {
 *         type: 'text',
 *         value: 'foo'
 *       }
 *     ]
 *   }, {}); // '[foo]'
 *
 * @param {Node} node - Node to compile.
 * @param {Node?} definition - Definition node, when
 *   existing.
 * @param {HTMLCompiler} context - Instance.
 * @return {string?} - If without definition, returns a
 *   string, returns nothing otherwise.
 */
function failsafe(node, definition, context) {
    var result;

    if (node.referenceType === 'shortcut' && !definition.link) {
        result = node.children ? context.all(node).join('') : node.alt;

        return (node.type === 'imageReference' ? '!' : '') +
            '[' + result + ']';
    }

    return '';
}

/**
 * Stringify all footnote definitions, if any.
 *
 * @example
 *   generateFootnotes(); // '<div class="footnotes">\n<hr>\n...'
 *
 * @return {string} - Compiled footnotes, if any.
 * @this {HTMLCompiler}
 */
function generateFootnotes() {
    var self = this;
    var definitions = self.footnotes;
    var length = definitions.length;
    var index = -1;
    var results = [];
    var def;

    if (!length) {
        return '';
    }

    while (++index < length) {
        def = definitions[index];

        results[index] = self.listItem({
            'type': 'listItem',
            'data': {
                'htmlAttributes': {
                    'id': 'fn-' + def.identifier
                }
            },
            'children': def.children.concat({
                'type': 'link',
                'href': '#fnref-' + def.identifier,
                'data': {
                    'htmlAttributes': {
                        'class': 'footnote-backref'
                    }
                },
                'children': [{
                    'type': 'text',
                    'value': '↩'
                }]
            }),
            'position': def.position
        }, {});
    }

    return h(self, null, {
        'name': 'div',
        'attributes': {
            'class': 'footnotes'
        },
        'content': h(self, null, {
                'name': 'hr'
            }) +
            '\n' +
            h(self, null, {
                'name': 'ol',
                'content': results.join('\n')
            }, null, true)
    }, null, true) + '\n';
}

/**
 * Stringify an unknown node.
 *
 * @example
 *   unknown({
 *     data: {
 *       htmlName: 'section'
 *     },
 *     children: [
 *       {
 *         type: 'text',
 *         value: 'foo'
 *       }
 *     ]
 *   }); // '<section>foo</section>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function unknown(node) {
    var content = 'children' in node ? this.all(node).join('') : node.value;

    return h(this, node, {
        'name': 'div',
        'content': content || ''
    }, node.data);
}

/**
 * Visit a node.
 *
 * @example
 *   var compiler = new Compiler();
 *
 *   compiler.visit({
 *     type: 'strong',
 *     children: [{
 *       type: 'text',
 *       value: 'Foo'
 *     }]
 *   });
 *   // '**Foo**'
 *
 * @param {Object} node - Node.
 * @param {Object?} [parent] - `node`s parent.
 * @return {string} - Compiled `node`.
 */
function one(node, parent) {
    var self = this;
    var type = node && node.type;
    var fn = typeof self[type] === 'function' ? type : 'unknown';

    if (!type) {
        self.file.fail('Expected node `' + node + '`');
    }

    return self[fn](node, parent);
}

/**
 * Stringify the children of `node`.
 *
 * @example
 *   all({
 *     children: [
 *       {
 *         type: 'text',
 *         value: 'foo'
 *       }
 *     ]
 *   }); // 'foo'
 *
 * @param {Node} parent - Parent to visit.
 * @return {Array.<string>}
 * @this {HTMLCompiler}
 */
function all(parent) {
    var self = this;
    var nodes = parent.children;
    var values = [];
    var index = -1;
    var length = nodes.length;
    var value;
    var prev;

    while (++index < length) {
        value = self.visit(nodes[index], parent);

        if (value) {
            if (
                prev &&
                (
                    prev.type === 'break' ||
                    (prev.type === 'escape' && prev.value === '\n')
                )
            ) {
                value = trim.left(value);
            }

            values.push(value);
        }

        prev = nodes[index];
    }

    return values;
}

/**
 * Stringify a root object.
 *
 * @example
 *   // This will additionally include defined footnotes,
 *   // when applicable.
 *   root({
 *     children: [
 *       {
 *         type: 'paragraph',
 *         children: [
 *           {
 *             type: 'text',
 *             value: 'foo'
 *           }
 *         ]
 *       }
 *     ]
 *   }); // '<p>foo</p>\n'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function root(node) {
    var self = this;
    var definitions = {};
    var footnotes = [];
    var result;

    self.definitions = definitions;
    self.footnotes = footnotes;

    visit(node, 'definition', function (definition) {
        definitions[definition.identifier.toUpperCase()] = definition;
    });

    visit(node, 'footnoteDefinition', function (definition) {
        footnotes.push(definition);
    });

    result = self.all(node).join('\n');

    return (result ? result + '\n' : '') + self.generateFootnotes();
}

/**
 * Stringify a block quote.
 *
 * @example
 *   blockquote({
 *     children: [
 *       {
 *         type: 'paragraph',
 *         children: [
 *           {
 *             type: 'text',
 *             value: 'foo'
 *           }
 *         ]
 *       }
 *     ]
 *   }); // '<blockquote>\n<p>foo</p>\n</blockquote>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function blockquote(node) {
    return h(this, node, {
        'name': 'blockquote',
        'content': this.all(node).join('\n')
    }, node.data, true);
}

/**
 * Stringify an inline footnote.
 *
 * @example
 *   // This additionally adds a definition at the bottem
 *   // of the document.
 *   footnote({
 *     children: [
 *       {
 *         type: 'text',
 *         value: 'foo'
 *       }
 *     ]
 *   }); // '<sup id="fnref-1"><a href="#fn-1">1</a></sup>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function footnote(node) {
    var self = this;
    var definitions = self.footnotes;
    var index = -1;
    var length = definitions.length;
    var identifiers = [];
    var identifier;

    while (++index < length) {
        identifiers[index] = definitions[index].identifier;
    }

    index = -1;
    identifier = 1;

    while (identifiers.indexOf(String(identifier)) !== -1) {
        identifier++;
    }

    identifier = String(identifier);

    self.footnotes.push({
        'type': 'footnoteDefinition',
        'identifier': identifier,
        'children': node.children,
        'position': node.position
    });

    return self.footnoteReference({
        'type': 'footnoteReference',
        'identifier': identifier,
        'position': node.position
    });
}

/**
 * Stringify a list.
 *
 * @example
 *   list({
 *     ordered: true
 *     loose: false
 *     children: [
 *       {
 *         type: 'listItem',
 *         children: [
 *           {
 *             type: 'paragraph',
 *             children: [
 *               {
 *                 type: 'text',
 *                 value: 'foo'
 *               }
 *             ]
 *           }
 *         ]
 *       }
 *     ]
 *   }); // '<ol>\n<li>foo</li>\n</ol>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function list(node) {
    return h(this, node, {
        'name': node.ordered ? 'ol' : 'ul',
        'attributes': {
            'start': node.start !== 1 ? node.start : null
        },
        'content': this.all(node).join('\n')
    }, node.data, true);
}

/**
 * Stringify a list-item.
 *
 * @example
 *   listItem({
 *     children: [
 *       {
 *         type: 'paragraph',
 *         children: [
 *           {
 *             type: 'text',
 *             value: 'foo'
 *           }
 *         ]
 *       }
 *     ]
 *   }, {
 *     loose: false
 *   }); // '<li>foo</li>'
 *
 * @param {Node} node - Node to compile.
 * @param {Node} parent - Parent of `node`.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function listItem(node, parent) {
    var single;
    var result;

    single = !parent.loose &&
        node.children.length === 1 &&
        node.children[0].children;

    result = this.all(single ? node.children[0] : node)
        .join(single ? '' : '\n');

    return h(this, node, {
        'name': 'li',
        'content': result
    }, node.data, !single);
}

/**
 * Stringify a heading.
 *
 * @example
 *   heading({
 *     depth: 3,
 *     children: [
 *       {
 *         type: 'text',
 *         value: 'foo'
 *       }
 *     ]
 *   }); // '<h3>foo</h3>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function heading(node) {
    return h(this, node, {
        'name': 'h' + node.depth,
        'content': this.all(node).join('')
    }, node.data);
}

/**
 * Stringify a paragraph.
 *
 * @example
 *   paragraph({
 *     children: [
 *       {
 *         type: 'text',
 *         value: 'foo'
 *       }
 *     ]
 *   }); // 'foo'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function paragraph(node) {
    return h(this, node, {
        'name': 'p',
        'content': trim(detab(this.all(node).join('')))
    }, node.data);
}

/**
 * Stringify a code block.
 *
 * @example
 *   code({
 *     value: 'foo &amp; bar;'
 *   }); // '<pre><code>foo &amp;amp; bar\n</code></pre>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function code(node) {
    var self = this;
    var value = node.value ? detab(node.value + '\n') : '';

    return h(self, node, {
        'name': 'pre',
        'content': h(self, node, {
            'name': 'code',
            'content': self.encode(value)
        }, node.data)
    });
}

/**
 * Stringify a table.
 *
 * @example
 *   table({
 *     children: [
 *       {
 *         type: 'tableRow',
 *         ...
 *       }
 *     ]
 *   }); // '<table><thead>...'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function table(node) {
    var self = this;
    var rows = node.children;
    var index = rows.length;
    var align = node.align;
    var alignLength = align.length;
    var pos;
    var result = [];
    var row;
    var out;
    var name;
    var cell;

    while (index--) {
        pos = alignLength;
        row = rows[index].children;
        out = [];
        name = index === 0 ? 'th' : 'td';

        while (pos--) {
            cell = row[pos];
            out[pos] = h(self, cell, {
                'name': name,
                'attributes': {
                    'align': align[pos]
                },
                'content': cell ? self.all(cell).join('\n') : ''
            }, cell && cell.data);
        }

        result[index] = h(self, rows[index], {
            'name': 'tr',
            'content': out.join('\n')
        }, rows[index], true);
    }

    return h(self, node, {
        'name': 'table',
        'content': h(self, node, {
                'name': 'thead',
                'content': result[0]
            }, null, true) +
            '\n' +
            h(self, node, {
                'name': 'tbody',
                'content': result.slice(1).join('\n')
            }, null, true)
    }, node.data, true);
}

/**
 * Stringify a literal HTML.
 *
 * @example
 *   html({
 *     value: '<i>italic</i>'
 *   }); // '<i>italic</i>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function html(node) {
    return this.options.sanitize ? this.encode(node.value) : node.value;
}

/**
 * Stringify a horizontal rule.
 *
 * @example
 *   rule(); // '<hr>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function rule(node) {
    return h(this, node, {
        'name': 'hr'
    }, node.data);
}

/**
 * Stringify inline code.
 *
 * @example
 *   inlineCode({
 *     value: 'foo &amp; bar;'
 *   }); // '<code>foo &amp;amp; bar;</code>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function inlineCode(node) {
    return h(this, node, {
        'name': 'code',
        'content': collapse(this.encode(node.value))
    }, node.data);
}

/**
 * Stringify strongly emphasised content.
 *
 * @example
 *   strong({
 *     children: [
 *       {
 *         type: 'text',
 *         value: 'foo'
 *       }
 *     ]
 *   }); // '<strong>foo</strong>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function strong(node) {
    return h(this, node, {
        'name': 'strong',
        'content': this.all(node).join('')
    }, node.data);
}

/**
 * Stringify emphasised content.
 *
 * @example
 *   emphasis({
 *     children: [
 *       {
 *         type: 'text',
 *         value: 'foo'
 *       }
 *     ]
 *   }); // '<em>foo</em>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function emphasis(node) {
    return h(this, node, {
        'name': 'em',
        'content': this.all(node).join('')
    }, node.data);
}

/**
 * Stringify an inline break.
 *
 * @example
 *   hardBreak(); // '<br>\n'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function hardBreak(node) {
    return h(this, node, {
        'name': 'br'
    }, node.data) + '\n';
}

/**
 * Stringify a link.
 *
 * @example
 *   link({
 *     href: 'http://example.com',
 *     children: [
 *       {
 *         type: 'text',
 *         value: 'foo'
 *       }
 *     ]
 *   }); // '<a href="http://example.com">foo</a>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function link(node) {
    return h(this, node, {
        'name': 'a',
        'attributes': {
            'href': normalizeURI(node.href),
            'title': node.title
        },
        'content': this.all(node).join('')
    }, node.data);
}

/**
 * Stringify a reference to a footnote.
 *
 * @example
 *   // If a definition was added previously:
 *   footnoteReference({
 *     identifier: 'foo'
 *   });
 *   // <sup id="fnref-foo">
 *   //   <a class="footnote-ref" href="#fn-foo">foo</a>
 *   // </sup>
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function footnoteReference(node) {
    var identifier = node.identifier;

    return h(this, node, {
        'name': 'sup',
        'attributes': {
            'id': 'fnref-' + identifier
        },
        'content': h(this, node, {
            'name': 'a',
            'attributes': {
                'href': '#fn-' + identifier,
                'class': 'footnote-ref'
            },
            'content': identifier
        })
    }, node.data);
}

/**
 * Stringify a reference to a link.
 *
 * @example
 *   // If a definition was added previously:
 *   linkReference({
 *     identifier: 'foo'
 *   }); // '<a href="http://example.com/fav.ico"></a>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function linkReference(node) {
    var self = this;
    var def = self.definitions[node.identifier.toUpperCase()] || {};

    return failsafe(node, def, self) || h(self, node, {
        'name': 'a',
        'attributes': {
            'href': normalizeURI(def.link || ''),
            'title': def.title
        },
        'content': self.all(node).join('')
    }, node.data);
}

/**
 * Stringify a reference to an image.
 *
 * @example
 *   // If a definition was added previously:
 *   imageReference({
 *     identifier: 'foo'
 *   }); // '<img src="http://example.com/fav.ico" alt="">'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function imageReference(node) {
    var self = this;
    var def = self.definitions[node.identifier.toUpperCase()] || {};

    return failsafe(node, def, self) || h(self, node, {
        'name': 'img',
        'attributes': {
            'src': normalizeURI(def.link || ''),
            'alt': node.alt || '',
            'title': def.title
        }
    }, node.data);
}

/**
 * Stringify an image.
 *
 * @example
 *   image({
 *     src: 'http://example.com/fav.ico'
 *   }); // '<img src="http://example.com/fav.ico" alt="">'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function image(node) {
    return h(this, node, {
        'name': 'img',
        'attributes': {
            'src': normalizeURI(node.src),
            'alt': node.alt || '',
            'title': node.title
        }
    }, node.data);
}

/**
 * Stringify a deletion.
 *
 * @example
 *   strikethrough({
 *     children: [
 *       {
 *         type: 'text',
 *         value: 'foo'
 *       }
 *     ]
 *   }); // '<del>foo</del>'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function strikethrough(node) {
    return h(this, node, {
        'name': 'del',
        'content': this.all(node).join('')
    }, node.data);
}

/**
 * Stringify text.
 *
 * @example
 *   text({value: '&'}); // '&amp;'
 *
 *   text({value: 'foo'}); // 'foo'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function text(node) {
    return trimLines(this.encode(node.value));
}

/**
 * Stringify escaped text.
 *
 * @example
 *   escape({value: '\n'}); // '<br>\n'
 *
 *   escape({value: '|'}); // '\\|'
 *
 * @param {Node} node - Node to compile.
 * @return {string} - Compiled node.
 * @this {HTMLCompiler}
 */
function escape(node) {
    return this[node.value === '\n' ? 'break' : 'text'](node);
}

/**
 * Return an empty string for nodes which are ignored.
 *
 * @example
 *   ignore(); // ''
 *
 * @return {string} - Empty string.
 * @this {HTMLCompiler}
 */
function ignore() {
    return '';
}

/*
 * Helpers.
 */

visitors.visit = one;
visitors.all = all;
visitors.unknown = unknown;
visitors.generateFootnotes = generateFootnotes;

/*
 * Ignored nodes.
 */

visitors.yaml = ignore;
visitors.definition = ignore;
visitors.footnoteDefinition = ignore;

/*
 * Compilers.
 */

visitors.footnote = footnote;
visitors.root = root;
visitors.blockquote = blockquote;
visitors.list = list;
visitors.listItem = listItem;
visitors.paragraph = paragraph;
visitors.heading = heading;
visitors.table = table;
visitors.code = code;
visitors.html = html;
visitors.horizontalRule = rule;
visitors.inlineCode = inlineCode;
visitors.strong = strong;
visitors.emphasis = emphasis;
visitors.break = hardBreak;
visitors.link = link;
visitors.image = image;
visitors.footnoteReference = footnoteReference;
visitors.linkReference = linkReference;
visitors.imageReference = imageReference;
visitors.delete = strikethrough;
visitors.text = text;
visitors.escape = escape;

/*
 * Expose.
 */

module.exports = visitors;
