<template>
  <div class="qiankun">
    <h3>{{appName}}</h3>
    <div id="subApp"></div>
  </div>
</template>
<script lang="ts">
import { Component, Emit } from 'vue-property-decorator'
import Vue from 'vue'
import { LoadableApp } from 'qiankun'

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

    mounted () {
      this.$afterMounted(app => {
        this.appMounted(app)
      })
      this.$afterUnMounted(app => {
        this.appUnmounted(app)
      })
      this.$qiankunVue.start()
    }
}
</script>
