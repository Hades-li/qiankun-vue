<template>
  <div class="qiankun">
    <div id="subApp"></div>
  </div>
</template>
<script>
export default {
  name: 'Qiankun',
  mounted () {
    this.$afterMounted(app => {
      this.$emit('appMounted', app)
    })
    this.$afterUnMounted(app => {
      this.$emit('appUnmounted', app)
    })
    this.$qiankunVue.start()
  }
}
</script>
