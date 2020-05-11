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
    name: 'Framework',
    beforeRouteLeave (to, from, next) {
      next()
    }
  })
export default class extends Vue {
  afterMounted (app: any) {
    console.log('子应用挂载结束', app)
  }

  afterUnmounted (app: any) {
    console.log('子应用卸载结束', app)
  }

  error (err: any) {
    console.log('app报错', err)
  }
}
</script>
<style lang="scss" scoped></style>
