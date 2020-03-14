const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpack = require('webpack');

// https://github.com/webpack/webpack/issues/6460#issuecomment-364286147
module.exports = (env, argv) => ({
    entry: './src/js/index.js',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    argv.mode === 'production'
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            autoprefixer: {},
                            cssnano: {},
                            plugins: () => [autoprefixer, cssnano]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            },
            {
                test: /images.*\.(jpe?g|png|gif|svg)$/,
                exclude: path.resolve(__dirname, 'src/images/svg-sprite'),
                loader: 'url-loader',
                options: {
                    // Inline files smaller than 10 kB (10240 bytes)
                    limit: 10 * 1024
                }
            },
            {
                test: /images.*\.(jpe?g|png|gif|svg)$/,
                exclude: path.resolve(__dirname, 'src/images/svg-sprite'),
                loader: 'image-webpack-loader',
                // This will apply the loader before the other ones
                enforce: 'pre'
            },
            {
                test: /\.svg$/,
                include: path.resolve(__dirname, 'src/images/svg-sprite'),
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: false
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        inline: true,
        port: 9000,
        open: true
    },
    devtool: 'eval-source-map',
    plugins: [
        new CleanWebpackPlugin('./dist', {
            // exclude: ['']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new SpriteLoaderPlugin({
            // plainSprite: true
        }),
        // to generate Multiple HTML Files
        // https://github.com/jantimon/html-webpack-plugin#generating-multiple-html-files
        // new HtmlWebpackPlugin({
        //     filename: 'page2.html',
        //     template: './src/page2.html'
        // }),
        new MiniCssExtractPlugin({
            filename:
                argv.mode === 'production'
                    ? '[name].[hash].css'
                    : '[name].[hash].css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    // https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-2
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
});
