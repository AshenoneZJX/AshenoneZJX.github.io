const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      // 构建时将 src/content/assets（文章附件）复制到 dist/content/assets，
      // Markdown 中通过 /content/assets/... 引用
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src/content/assets'),
          to: path.resolve(__dirname, 'dist/content/assets'),
          ignore: ['*.md', '.DS_Store', '**/*.md', '**/.DS_Store']
        }
      ])
    ]
  },
  chainWebpack: config => {
    config.module
      .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf|ttc)(\?.*)?$/i)

    config.module
      .rule('xlsx')
      .test(/\.xlsx$/i)
      .use('file-loader')
      .loader('file-loader')
      .options({ name: 'assets/[name].[hash:8].[ext]' })
      .end()
  }
}
