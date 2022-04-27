const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { isBooleanObject } = require('util/types');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js', //cual es el archivo princial y donde esta
  output: {
    //donde vamos a compilar el reultado
    path: path.resolve(__dirname, 'dist'), //una vez q se donde estoy voy a crear la carpeta dist
    filename: 'bundle.js', // como vamos a llamar al archivo resultante
    publicPath:'/', //para poder navegare scribiendo la URL
  },
  //extensiones q vamos a utilizar
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // reglas y particularidades
  module: {
    rules: [
      {
        //archivos js
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        //archivos html
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        //uso de css
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    //instamncia del plugin
    new MiniCSSExtractPlugin({
      filename: 'assets/[name].css',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3005,
    open: true,
    historyApiFallback:true,
  },
};
