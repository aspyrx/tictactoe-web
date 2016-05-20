/* eslint-env node */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    debug: true,
    context: path.resolve(__dirname),
    entry: {
        app: 'src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].min.js'
    },
    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules']
    },
    node: {
        fs: 'empty'
    },
    eslint: {
        configFile: path.join(__dirname, '.eslintrc.json')
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.woff\d?(\?.+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.ttf(\?.+)?$/,
                loader: 'url?limit=10000&minetype=application/octet-stream'
            },
            {
                test: /\.eot(\?.+)?$/,
                loader: 'url?limit=10000'
            },
            {
                test: /\.svg(\?.+)?$/,
                loader: 'url?limit=10000&minetype=image/svg+xml'
            },
            {
                test: /\.png$/,
                loader: 'url?limit=10000&mimetype=image/png'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};