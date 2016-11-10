var path = require("path");
module.exports = {
  entry: {
    app: ["./src/index.tsx"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.js', 'ts', 'tsx']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loaders: 'babel?plugins[]=inferno!ts-loader' }
    ]
  },
  devServer: {
    contentBase: "./public",
    inline: true
  }
};