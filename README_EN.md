# qiankun-vue
one vue plugin power by [qiankun](https://github.com/umijs/qiankun)。

## install
```shell
yarn add qiankun-vue or npm install qiankun-vue --save
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

mainApp route config

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

