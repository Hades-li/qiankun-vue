<template>
  <ul class="menu">
    <li>
      <router-link to="/">Home</router-link>
    </li>
    <li>
      <router-link to="/about">About</router-link>
    </li>
    <li>
      <router-link to="/dashboard">Dashboard<br>(microApp)</router-link>
    </li>
    <li>
      <router-link to="/example">Example<br>(microApp)</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  name: 'Menu'
})
export default class Menu extends Vue {

}
</script>

<style lang="scss" scoped>
  .menu {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 170px;

    li {
      font-size: 18px;
      padding: 10px 0;

      a {
        text-decoration: none;

        &:hover {
          color: #13ce66;
        }
      }
    }
  }
</style>
