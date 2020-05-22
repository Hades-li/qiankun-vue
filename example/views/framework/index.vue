<template>
  <div class="framework">
    <qiankun
      @app-mounted="afterMounted"
      @app-unmounted="afterUnmounted"
      @uncaught-error="error"
      @loading="loading"
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
    // console.log('子应用挂载结束', app)
    // debugger
  }

  afterUnmounted (app) {
    // console.log('子应用卸载结束', app)
  }

  error (err) {
    // console.log('app报错', err)
  }
  loading() {
    // todo
    // debugger
  }
}
</script>
<style lang="scss" scoped></style>
