const webpackTestConfig = require('./test/webpack.test.config');

/* We use separate webpack test config for unit tests as we can get rid
   of all unnecessary stuff. We could also use our standard webpack.config.js,
   but would then need to modify the "files" field the following way: */

//     files: [
//       /* We need to list shared module first, otherwise we'll get the
//         "Uncaught ReferenceError: webpackJsonp is not defined" error,
//         because of the CommonChunksPlugin, see
//         https://github.com/webpack-contrib/karma-webpack/issues/24 */
//       'dist/vendor.bundle.js',  
//       'test/**/*.spec.ts',
//     ],

/* We would also need to include the webpack.SourceMapDevToolPlugin in
   the webpack.config.js (see how it's done in webpack.test.config.js) */


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ["jasmine"],
    files: [
      'test/**/*.spec.ts', // our test files
    ],
    exclude: [
      "node_modules"
    ],
    preprocessors: {
      'test/**/*.spec.ts': ['webpack'],
    },
    /* We only need "module", "resolve" and "plugins" fields from the
       webpack config so we could also write
       webpack: {
         module: webpackConfig.module,
         resolve: webpackConfig.resolve,
         plugins: webpackConfig.plugins
      } 
    */
    webpack: webpackTestConfig,
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    mime: { 'text/x-typescript': ['ts'] } /* solves ran 0 of 0 ERROR
      (see: https://github.com/angular/angular-cli/issues/2838 and
      https://github.com/angular/angular-cli/issues/2125) */
  });
}
