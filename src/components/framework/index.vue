<template>
  <div class="qiankun">
    <div ref="subApp" id="subApp"></div>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Vue, Watch } from 'vue-property-decorator'
import { LoadableApp } from 'qiankun'
import {AppModule, DeviceType} from "../../../example/vue-dashboard/src/store/modules/app";

  @Component({
    name: 'Qiankun'
  })
export default class extends Vue {
    private appName = ''

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
    uncaughtError (event: Event | string) {
      if (process.env.NODE_ENV === 'development') {
        console.log(event)
      }
    }

    @Watch('$route')
    private onRouteChange () {
      this.loadApp()
    }

    mounted () {
      this.$afterMounted(app => {
        this.appMounted(app)
      })
      this.$afterUnMounted(app => {
        this.appUnmounted(app)
      })
      this.$qiankunVue.start()

      this.$qiankunVue.errorHandle = this.uncaughtError
    }

    // 根据路由 手动加载子应用
    loadApp () {
      const actRule = this.$route.path.split('/')[1]
      this.$loadMicroApp(this.$refs.subApp as HTMLElement, actRule)
    }
}
</script>
