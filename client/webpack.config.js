import 'dotenv/config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
    watchFiles: ['./src/**/*.{js,jsx, css, scss}'],
    hot: true
  },
  watchOptions: {
    ignored: ['src/database/database.json']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@reducers': path.resolve(__dirname, 'src/redux/reducers'),
      '@forms': path.resolve(__dirname, 'src/forms')
    },
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.?(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,

        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
  mode: process.env.NODE_ENV || 'development'
};

export default config;
