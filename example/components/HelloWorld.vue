<template>
  <div class="hello">
    <h3>Hello qiankun-vue</h3>
    <p class="text">
      qiankun-vue是一个基于qiankun微前端框架的vue插件。可以让你更容易的在vue中使用。它可以实现在主应用自己的页面和子应用的页面自由跳转。
      可以方便的集成到类似vue-admin-element这样的中后台框架中去。
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
.text {
  line-height: 1.5em;
}
</style>
