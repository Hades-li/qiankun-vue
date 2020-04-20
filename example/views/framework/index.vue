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
