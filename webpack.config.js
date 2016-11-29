var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ["./src/client/index.tsx"]
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
      { test: /\.tsx?$/, loaders: [ { loader: 'ts-loader', query: { configFileName: './src/client/tsconfig.json' } } ]},
      { test: /\.css$/, loader: ExtractTextPlugin.extract({
        loader: 'css-loader?camelCase&importLoaders=1&modules&localIdentName=[name]_[local]_[hash:base64:3]!postcss-loader'
      })}
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css')
  ],
  devServer: {
    contentBase: "./public",
    inline: true,
    proxy: [
      {
        context: ['/**/*', '!**/*.css', '!**/*.js'],
        target: 'http://localhost:3000',
        secure: false
      }
    ]
  },
};