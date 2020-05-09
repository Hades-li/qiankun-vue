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
    console.log('子应用挂载结束')
  }

  afterUnmounted (app: any) {
    console.log('子应用卸载结束')
  }

  error (event: ErrorEvent) {
    if (event.error) {
      console.log(`"${event.error.appOrParcelName}" app is no fetch`)
    }
  }
}
</script>
<style lang="scss" scoped></style>
