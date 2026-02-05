module.exports = {
  chainWebpack: config => {
    config.module
      .rule('xlsx')
      .test(/\.xlsx$/i)
      .use('file-loader')
      .loader('file-loader')
      .options({ name: 'assets/[name].[hash:8].[ext]' })
      .end()
  }
}
