const webpack = require('webpack');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'actions': path.resolve(__dirname, 'src/actions.js')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.CLIENT_URL': JSON.stringify(process.env.CLIENT_URL || 'http://localhost:3000')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}