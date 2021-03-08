const path = require('path')
const webpack = require('webpack')
const SizePlugin = require('size-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {cssLoader, postcssLoader, scssLoader} = require('./postcss.config')()

module.exports = {
    entry: ['./src/client/main.js', './src/styles/index.scss'],
    output: {
        path: path.resolve(__dirname, '../', 'public'),
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[name].js',
        publicPath: '/'
    },
    resolve: {
        fallback: {
            crypto: false,
            http: false,
            https: false
        }
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                            )
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {bypassOnDebug: true}
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: 'raw-loader'
            }
        ]
    },
    mode: process.env.NODE_ENV,
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        {
                            calc: false,
                            zindex: false
                        }
                    ]
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    name: 'vendor',
                    test: /node_modules/
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'true',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[name].css',
        }),
        new LoadablePlugin(),
        new SizePlugin(),
        new WorkboxPlugin.GenerateSW({
            // https://web.dev/extending-workbox/
            clientsClaim: true,
            skipWaiting: true,
            cleanupOutdatedCaches: true,
            cacheId: 'winkel_ssr_cache',
            swDest: path.resolve(__dirname, '../', 'public', 'sw.js'),
            sourcemap: process.env.NODE_ENV == 'production',
            runtimeCaching: [
                {
                    urlPattern: /^http?:\/\/localhost:3000/,
                    handler: 'StaleWhileRevalidate',
                    options: {
                        cacheName: 'runtime-cache',
                        expiration: {
                            maxEntries: 1000,
                            maxAgeSeconds: 300
                        }
                    }
                }
            ]
        })
    ]
}
