module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha'],
    files: [
      'test/**/*Test.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*Test.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [],
      extensions: ['.js']
    },
    proxies: {},
    urlRoot: '/',
    browserNoActivityTimeout: 180000,
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
