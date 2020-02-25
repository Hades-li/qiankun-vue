module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: "example/main.ts",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html"
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", "/Users/plusli/Develop/微前端/qiankun-vue-main/example");
  }
};
