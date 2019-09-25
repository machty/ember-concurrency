const regex = /((\.tar(\.gz)?)|(\.tgz))$/;

module.exports = function isTarGz(str) {
  return regex.test(str);
};
