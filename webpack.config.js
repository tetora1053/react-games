module.exports = {
  entry: { app: "./src/index.js" },
  output: {
    path: __dirname + '/public/js',
    filename: "[name].js"
  },
  devServer: {
    contentBase: __dirname + '/public',
    port: 10080,
    publicPath: '/js/',
    disableHostCheck: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  mode: 'none'
};
