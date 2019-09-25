'use strict';

function getConfigPath(project) {
  let configDir = 'config';

  if (project.pkg['ember-addon'] && project.pkg['ember-addon']['configPath']) {
    configDir = project.pkg['ember-addon']['configPath'];
  }

  return `./${configDir}/optional-features.json`;
}

function join(strings /*, ...args */) {
  let parts = [];

  for (let i=0; i<strings.length-1; i++) {
    parts.push(strings[i], arguments[i+1]);
  }

  parts.push(strings[strings.length-1]);

  return parts.join('');
}

function strip(/* strings, ...args */) {
  let string = join.apply(undefined, arguments);
  let lines = string.split('\n');

  if (lines[0] === '') {
    lines.shift();
  }

  if (lines.length === 0) {
    return '';
  }

  let last = lines[lines.length - 1];

  if (last.trim() === '') {
    lines[lines.length - 1] = last.trim();
  }

  let indent = lines[0].match(/^ */)[0];

  return lines.map(line => line.replace(indent, '')).join('\n');
}

module.exports = {
  getConfigPath,
  join,
  strip
};
