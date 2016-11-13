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
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    loaders: [
      // { test: /\.tsx?$/, loaders: 'babel', query: {
      //   plugins: [["transform-react-jsx", { "pragma": "createElement" }]]
      // }},
      { test: /\.tsx?$/, loaders: 'ts-loader' },
    ]
  },
  devServer: {
    contentBase: "./public",
    inline: true,
    historyApiFallback: true
  }
};