# qiankun-vue
基于[qiankun](https://github.com/umijs/qiankun)微前端架构的vue插件，用于主应用。

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

用于渲染子应用的页面

```vue
<template>
  <div class="framework">
    <qiankun
      @app-mounted="afterMounted"
      @app-unmounted="afterUnmounted"
    ></qiankun>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Framework'
  })
export default class extends Vue {

  afterMounted (app: any) {
    console.log('子应用挂载结束')
  }

  afterUnmounted (app: any) {
    console.log('子应用卸载结束')
  }
}
</script>
<style lang="scss" scoped></style>

```

