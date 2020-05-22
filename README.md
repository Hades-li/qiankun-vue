# qiankun-vue
qiankun-vue是一个基于[qiankun](https://github.com/umijs/qiankun) 微前端框架的vue插件。可以让你更容易的在vue中使用。它可以实现在主应用自己的页面和子应用的页面自由跳转。 可以方便的集成到类似vue-admin-element这样的中后台框架中去。
基于微前端架构的vue插件，用于主应用。

## install
```shell
yarn add qiankun-vue qiankun or npm install qiankun-vue qiankun --save

```
## use

main.js
```vuejs
const qiankunVue = new QiankunVue([
  {
    name: 'dashboard',
    entry: '//localhost:5001',
    activeRule: '/dashboard'
  },
  {
    name: 'example',
    entry: '//localhost:5002',
    activeRule: '/example'
  }
])

new Vue({
  router,
  store,
  qiankunVue,
  render: h => h(App)
}).$mount('#main')
```


用于渲染子应用的页面

framework/index.vue

```vue
<template>
  <div class="framework">
    <qiankun
      @app-mounted="afterMounted"
      @app-unmounted="afterUnmounted"
      @uncaught-error="error"
    ></qiankun>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Framework'
  })
export default class extends Vue {
  afterMounted (app) {
    console.log('子应用挂载结束', app)
  }

  afterUnmounted (app) {
    console.log('子应用卸载结束', app)
  }

  error (err) {
    console.log('app报错', err)
  }
}
</script>
<style lang="scss" scoped></style>
```

主应用路由配置

route/index.ts
```typescript
const routes = [
  {
    path: '/dashboard*',
    name: 'dashboard',
    component: Framework
  },
  {
    path: '/example*',
    name: 'example',
    component: Framework
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
```

## 初始化参数
```typescript
const qiankunVue = new QiankunVue([
  {
    name: 'dashboard', // 子应用名称
    entry: '//localhost:5001', // 子应用入口请求地址
    activeRule: '/dashboard' // 激活子应用的路由
  }
],configuration)
```

```typescript
configuration : {
  sandbox: boolean | {strictStyleIsolation: boolean} //开启沙盒，以及开启shadow dom模式
  singular: boolean
  ...
}
```
`configuration `这个配置同和[qiankun](https://qiankun.umijs.org/zh/api/#%E6%89%8B%E5%8A%A8%E5%8A%A0%E8%BD%BD%E5%BE%AE%E5%BA%94%E7%94%A8) 的配置相同。

注意：`strictStyleIsolation: true`，是采用[shadow dom](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM), 对
子应用进行样式隔离。但大多数vue项目，开发环境下style-loader会将样式提取成style，在生产环境下css会被提取，两者都会根据不同的组件切换进行动态加载。动态加载时，会将\<link\>\和<style\>直接加到页面根节点的\<head\>标签内。
这样，由于子应用已经被shadow dom进行样式隔离了。因此，加载进入的css就不能作用到子应用上。就和qiankun中说的一样，不能无脑使用。使用`strictStyleIsolation: true`需要自行解决子应用的样式以及其他资源加载问题。
比如在webpack处理时，去除css动态加载，一次性将整个子应用的资源全都直接生成在index.html里进行引用。





