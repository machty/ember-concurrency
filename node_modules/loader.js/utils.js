function shouldUseInstrumentedBuild() {
  return !!process.env.INSTRUMENT_HEIMDALL
}

module.exports = {
  shouldUseInstrumentedBuild: shouldUseInstrumentedBuild
};
