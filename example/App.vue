<template>
  <div class="app" id="main">
    <h3>Qiankun-vue</h3>
    <div class="app-container">
      <Menu></Menu>
<!--      <keep-alive>-->
        <router-view class="view-wrap"/>
<!--      </keep-alive>-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 10px;
}
.app-container {
  display: flex;
}
.view-wrap {
  border-left: 1px solid #13ce66;
  padding-left: 20px;
}
</style>
<script>
import Menu from './components/Menu'
export default {
  components: { Menu }
}
</script>
