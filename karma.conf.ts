import * as path from 'path';
import * as webpack from 'webpack';

// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

const coverage = process.env.COVERAGE || false;

module.exports = function(config) {
    config.set({
        basePath : './',
        frameworks : [ 'jasmine' ],
        plugins : [
            require('karma-jasmine'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular/cli/plugins/karma'),
            require('karma-phantomjs-launcher'),
            require('karma-story-reporter'),
        ],
        client : {
            clearContext : false // leave Jasmine Spec Runner output visible in browser
        },
        files : [
            { pattern : './src/test.ts', watched : false },
            { pattern : './src/**/*.html', included : false, watched : true, served : true },
            { pattern : './src/**/*.css', included : false, watched : true, served : true },
        ],
        preprocessors : { './src/test.ts' : [ 'webpack', 'sourcemap' ] },
        webpack : {
            resolve : { extensions : [ '.ts', '.js' ] },
            module : {
                rules : [
                    { test : /\.ts$/, loader : 'tslint-loader', exclude : /node_modules/, enforce : 'pre' },
                    { test : /\.ts$/, loaders : [ 'awesome-typescript-loader', 'angular2-template-loader' ], exclude : /node_modules/},
                    { test : /\.(html|css)$/, loader : 'raw-loader', exclude : /\.async\.(html|css)$/},
                    { test : /src\/.+\.ts$/, exclude : /(node_modules|\.spec\.ts$)/, loader : 'istanbul-instrumenter-loader', enforce : 'post' }
                ]
            },
            plugins : [
                new webpack.SourceMapDevToolPlugin({ filename : null, test : /\.(ts|js)($|\?)/i }),
                new webpack.LoaderOptionsPlugin({ options : { tslint : { emitErrors : config.singleRun, failOnHint : false } } }),
                new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(__dirname, 'src')),
                ...(config.singleRun ? [ new webpack.NoEmitOnErrorsPlugin() ] : [])
            ]
        },
        mime : { 'text/x-typescript' : [ 'ts', 'tsx' ] },
        coverageIstanbulReporter : { reports : !coverage ? [ 'text-summary' ] : [ 'html', 'text-summary' ], fixWebpackSourcePaths : true },
        storyReporter : {
            showSkipped : true,       // default: false
            showSkippedSummary : true // default: false
        },
        reporters : [ 'story', 'coverage-istanbul' ],
        port : 9876,
        colors : true,
        logLevel : config.LOG_INFO,
        autoWatch : true,
        browsers : [ 'PhantomJS' ],
        singleRun : true,
        phantomjsLauncher : {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError : true
        },
        browserConsoleLogOptions : { terminal : true, level : 'log' }
    });
};
