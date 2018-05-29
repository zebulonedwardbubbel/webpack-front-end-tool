const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/index.js',
    output: {
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
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {},
                            cssnano: {},
                            plugins: () => [
                                autoprefixer,
                                cssnano
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
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
    plugins: [
        new CleanWebpackPlugin('./dist', {}),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'page2.html',
        //     template: './src/page2.html'
        // }),
        new MiniCssExtractPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
    // optimization: {
    //     nodeEnv: 'production',
    //     minimize: true,
    //     concatenateModules: true
    // }
};
