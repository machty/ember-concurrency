import layout from '../templates/components/code-snippet';
import Component from '@ember/component';
import { computed } from '@ember/object';

const Highlight = self.require('highlight.js');

export default Component.extend({
  layout,
  tagName: 'pre',
  classNameBindings: ['language'],
  unindent: true,

  _unindent(src) {
    if (!this.get('unindent')) {
      return src;
    }
    let match, min;
    var lines = src.match(/[^\r\n]+/g); // Split in non-empty lines (both linux + windows)
    for (let i = 0; i < lines.length; i++) {
      match = /^[ \t]*/.exec(lines[i]);
      if (match && (typeof min === 'undefined' || min > match[0].length)) {
        min = match[0].length;
      }
    }
    if (typeof min !== 'undefined' && min > 0) {
      src = src.replace(new RegExp("^[ \t]{" + min + "}", 'gm'), "");
    }
    return src;
  },

  source: computed('name', function(){
    let snippet = this.get('name')
      .split('/')
      .reduce((dir, name) => dir && dir[name], this.snippets);

    return this._unindent(
      (snippet || "")
        .replace(/^(\s*\n)*/, '') // note: \s already matches \r, no need to check for [whitespace]\r\n
        .replace(/\s*$/, '')
    );
  }),

  didInsertElement(){
    Highlight.highlightBlock(this.get('element'));
  },

  language: computed('name', function(){
    let m = /\.(\w+)$/i.exec(this.get('name'));
    if (m) {
      switch (m[1].toLowerCase()) {
      case 'js':
        return 'javascript';
      case 'coffee':
        return 'coffeescript';
      case 'hbs':
        return 'htmlbars';
      case 'css':
        return 'css';
      case 'scss':
        return 'scss';
      case 'less':
        return 'less';
      case 'emblem':
        return 'emblem';
      case 'ts':
        return 'typescript';
      }
    }
  })
});
