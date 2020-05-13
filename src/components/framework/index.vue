<template>
  <div class="qiankun">
    <div ref="subApp" id="subApp"></div>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Vue, Watch } from 'vue-property-decorator'
import { LoadableApp } from 'qiankun'
import {Route} from "vue-router";

  @Component({
    name: 'Qiankun'
  })
export default class extends Vue {
    private curPath = '' // 当前路径

    @Emit()
    appMounted (app: LoadableApp) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`${app.name} 挂载完毕:`, app)
      }
    }

    @Emit()
    appUnmounted (app: LoadableApp) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`${app.name} 卸载完毕:`, app)
      }
    }

    @Emit()
    uncaughtError (event: any) {
      if (process.env.NODE_ENV === 'development') {
        console.log(event)
      }
    }

    @Watch('$route')
    private onRouteChange (route: Route) {
      this.loadApp(route.path)
    }

    beforeDestroy() {
      this.$qiankunVue.unmountApp() // 卸载当前挂载的子应用
    }

    mounted () {
      this.$qiankunVue.afterMounted(app => {
        this.appMounted(app)
      })
      this.$qiankunVue.afterUnmounted(app => {
        this.appUnmounted(app)
      })
      this.$qiankunVue.uncaughtError((err) => {
        this.uncaughtError(err)
      })
      this.$qiankunVue.start()

      this.loadApp()
    }

    // 根据路由 手动加载子应用
    loadApp (path: string) {
      const actRule = '/' + path.split('/')[1]
      this.$qiankunVue.loadMicroApp(this.$refs.subApp as HTMLElement, actRule)
    }
}
</script>
