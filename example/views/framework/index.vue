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
    // debugger
  }

  afterUnmounted (app: any) {
    // debugger
  }
}
</script>
<style lang="scss" scoped></style>
