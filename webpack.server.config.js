var path = require("path");
const nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ["./src/server/index.ts"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loaders: [ {loader: 'ts-loader', query: { configFileName: './src/server/tsconfig.json' } } ]},
      { test: /\.css$/, loader: ExtractTextPlugin.extract({
        loader: 'css-loader?camelCase&importLoaders=1&modules&localIdentName=[name]_[local]_[hash:base64:3]!postcss-loader'
      })}
      // { test: /\.css$/, loaders: [ 'isomorphic-style-loader', 'css-loader?camelCase&importLoaders=1&modules&localIdentName=[name]_[local]_[hash:base64:3]', 'postcss-loader' ] },
      // { test: /\.json$/, loaders: [ 'json-loader']}
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css')
  ],
  target: 'node',
  externals: [nodeExternals()]
};