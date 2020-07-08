const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const miniCSS = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: {
        main: './src/app/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [miniCSS.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: [miniCSS.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                    name: '[name].[ext]',
                }
            },
            {
                test: /\.(ttf|otf|woff|eot|woff2)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts',
                    name: '[name].[ext]',
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new miniCSS({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/public/index.html'
        }),
        new CopyPlugin({
            patterns: [{
                from: './src/assets/images/html',
                to: './images'
            }]
        })
    ],
    devServer: {
        contentBase: [path.resolve(__dirname, "src/public"), path.resolve(__dirname, "src/assets")],
        compress: true,
        port: 7700,
        historyApiFallback: true,
        host: '192.168.1.106'
    }
}