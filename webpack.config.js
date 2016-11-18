var path = require("path");
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
      { test: /\.tsx?$/, loaders: [ {loader: 'ts-loader', query: { configFileName: './src/client/tsconfig.json' } } ]},
      { test: /\.css$/, loaders: [ 'style-loader', 'css-loader?camelCase&importLoaders=1&modules', 'postcss-loader' ] }
    ]
  },
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