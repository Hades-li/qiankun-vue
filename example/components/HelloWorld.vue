<template>
  <div class="hello">
    <h3>Hello qiankun-vue</h3>
    <p>dashboard,example 是微前端应用。"about" 是主应用中的一个页面</p>
    <p>"dashboard","example" is microApp。about is one view of mainApp</p>
    <p>
      本应用是一个
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
