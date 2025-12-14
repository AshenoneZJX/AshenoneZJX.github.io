module.exports = {
  // 部署应用包时的基本 URL
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.my-app.com/
  // 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径
  // 例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
  // 对于 GitHub Pages，通常是 /<repo-name>/，或者是 / (如果是用户/组织主页)
  
  // 因为您的仓库名是 AshenoneZJX.github.io，这是一个用户主页仓库
  // 所以通常直接部署在根路径下即可
  publicPath: '/',

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
  }
}
