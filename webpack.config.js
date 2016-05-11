var webpack = require('webpack');
var path = require('path');


var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    devtool: 'inline-source-map',
    // entry: [
    //     'webpack-dev-server/client?http://127.0.0.1:8080/',
    //     'webpack/hot/only-dev-server',
    //     './src'
    // ],


    entry: process.env.NODE_ENV === 'production' ? [
        path.join(__dirname, 'src/index.js')
      ] : [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'src/index.js')
      ],



    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },


    plugins: process.env.NODE_ENV === 'production' ? [
        new HtmlWebpackPlugin({
          template: 'public/index.tpl.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin()
      ]: [
        new HtmlWebpackPlugin({
          template: 'public/index.tpl.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
      ],



    resolve: {
        moduleDirectories: ['node_modules', 'src'],
        extendions: ['', '.js']
    },
    module: {
        loaders: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel?presets[]=react']
        }]
    }
};