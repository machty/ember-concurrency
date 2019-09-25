module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'test/unit/helpers.js'
    ],
    exclude: [],
    preprocessors: {
      'test/unit/**.js': ['webpack']
    },
    webpack: {
      module: {
        noParse: [
          /node_modules\/sinon\//
        ],
        loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015'],
            plugins: ['transform-runtime']
          }
        }]
      },
      resolve: {
        modulesDirectories: [
          'node_modules'
        ],
        alias: {
          sinon: 'sinon/pkg/sinon.js'
        }
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress'],
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
}
