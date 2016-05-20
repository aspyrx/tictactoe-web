/* eslint-env node */
/* eslint no-console: "off" */

const process = require('process');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config');

const webpackBuildFinished = (err, stats) => {
    if (err) {
        console.log("\n\n===== WEBPACK BUILD FAILED =====");
        throw err;
    } else {
        console.log("\n\n===== WEBPACK BUILD FINISHED =====");
        console.log(stats.toString({ colors: true, timings: true, cached: false }));
    }
};

const webpackCompiler = webpack(webpackConfig);
if (process.argv.length > 2 && process.argv[2] === 'watch') {
    webpackCompiler.watch({}, webpackBuildFinished);
} else {
    webpackCompiler.run(webpackBuildFinished);
}

