const path = require('path')
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    index: path.resolve(__dirname, 'src', 'Index.ts')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
    clean: true,
    library: {
      type: 'module'
    }
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new TypescriptDeclarationPlugin({
      removeComments: false
    })
  ]
}
