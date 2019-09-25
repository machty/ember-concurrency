// don't reallocate the regex every time
const Matcher = /\d+\.\d+\.\d+/;

// don't require reparsing the string every time
const Matches = Object.create(null);

module.exports = function extractTrueVersion(versionString) {
  let version = Matches[versionString];

  if (version === undefined) {
    version = Matches[versionString] = versionString.match(Matcher)[0];
  }

  return version;
};
