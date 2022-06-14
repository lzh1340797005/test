const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
     port: 8080 
  },
  configureWebpack:{
    resolve:{
      alias:{
        'components':'@/components',
        'layout':'@/layout',
        'views':'@/views',
        'network': '@/network',
        'mixin':'@/mixin',
        'utils':'@/utils',
        'player':'@/player'
      }
    }
  }
})
