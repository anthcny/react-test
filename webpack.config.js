const webpack = require('webpack');

module.exports = {
    entry: './src/main.jsx',
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [ 
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            camelCase: true,
                            modules: true,
                            // localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            localIdentName: '[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: ['src/common/scss']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [ 
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            camelCase: true,
                            modules: true,
                            localIdentName: '[local]--[hash:base64:5]'
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: './dist',
      hot: true
    },
    mode: 'development'
}