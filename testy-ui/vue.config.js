
const mapProxies = paths => {
  const target = 'http://192.168.0.201:8081'
  return paths.reduce(
    (proxies, path) => ({
      ...proxies,
      [path]: {
        target,
        changeOrigin: false
      }
    }), {}
  )
}

module.exports = {
  devServer: {
    proxy: {
      ...mapProxies(['/api', '/meta/swagger'])
    },
    disableHostCheck: true
  },
  lintOnSave: true
}
