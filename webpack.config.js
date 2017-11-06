const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const BUILD_PATH = path.resolve(__dirname, 'build')
const SRC_PATH = path.resolve(__dirname, 'src')

const CHUNKS = [
  ['index', './src/pages/index.js'],
  // ['another-page', './src/pages/another-page.js'],
]

function getHtmlPlugin() {
  return new HtmlWebpackPlugin({
    inject: 'body',
    template: SRC_PATH + '/index.html',
    title: 'Artists in Area',
  })
}

function babelRule() {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  }
}

function getConfig(env = 'production') {
  let config = {
    devtool: 'cheap-module-source-map',
    // Entry-point of the single page application.
    entry: {
      'index': './src/pages/index.js',
    },
    module: {
      rules: [
        babelRule(),
      ],
    },
    output: {
      filename: '[name].js',
      path: BUILD_PATH,
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': `"${env}"` }),
    ],
    resolve: {
      alias: {
        components: path.resolve(SRC_PATH, 'components'),
        pages: path.resolve(SRC_PATH, 'pages'),
      },
      extensions: ['.js', '.jsx', '.css', '.json'],
      modules: [
        'node_modules',
        SRC_PATH,
      ],
    },
  }

  return config
}

function devConfig(chunkName, entryPath) {
  let config = getConfig('dev')
  config.output.publicPath = '/'

  config.entry = {
    [chunkName]: [
      // 'webpack-hot-middleware/client',
      entryPath,
    ],
  }

  if (chunkName !== 'index') {
    config.output.path = path.join(BUILD_PATH, chunkName)
    config.output.publicPath = '/' + chunkName
  }

  // configuration for the webpack dev server
  config.devServer = {
    contentBase: BUILD_PATH,
    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: (
      chunkName === 'index' ? true : { index: `/${chunkName}/` }),
    host: '0.0.0.0',
    // Enable hot module replacement.
    hot: true,
    inline: true,
    port: 3010,
    stats: 'errors-only',
  }

  // redefine plugins
  config.plugins = [
    ...config.plugins,
    // Show module instead of a number when hot reloading.
    new webpack.NamedModulesPlugin(),
    // enable hot-reloading of javascript and css
    new webpack.HotModuleReplacementPlugin(),
    // render the index.html, including the built files appropriately
    getHtmlPlugin(),
  ]

  return config
}

const configs = (() => {
  if (process.env.NODE_ENV === 'production') {
    // return [...prodConfig(), serverConfig()]
  }
  return CHUNKS.map(chunk => devConfig(chunk[0], chunk[1]))
})()

module.exports = configs
