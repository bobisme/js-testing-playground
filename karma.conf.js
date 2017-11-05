module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],

    files: [
      // Make sure to disable Karma’s file watcher
      // because the preprocessor will use its own.
      { pattern: 'test/**/*.spec.js', watched: false }
    ],

    preprocessors: {
      'test/**/*.spec.js': ['rollup']
    },

    reporters: ['progress'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,

    rollupPreprocessor: {
      plugins: [
        require('rollup-plugin-buble')()
      ],
      format: 'iife',         // Helps prevent naming collisions.
      name: 'playground',     // Required for 'iife' format.
      sourcemap: 'inline'     // Sensible for testing.
    }
  })
}
