const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {cssLoader, postcssLoader, scssLoader} = require('./postcss.config')()

module.exports = {
    entry: './src/server/main.js',
    target: 'node',
    externals: [
        nodeExternals({
            allowlist: [/@0bie\/pattern-lib-react/]
        })
    ],
    output: {
        path: path.resolve(__dirname, '../'),
        filename: 'server.js',
        publicPath: '/'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {publicPath: './public/'}
                    },
                    cssLoader,
                    postcssLoader,
                    scssLoader
                ]
            },
            {
                test: /\.(jpe?g|\.png|gif|\.svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            outputPath: path.resolve(
                                __dirname,
                                '../',
                                'public/assets'
                            ),
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {bypassOnDebug: true}
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'false'
        }),
        new MiniCssExtractPlugin({
            filename: 'chunked.css'
        }),
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1})
    ]
}
