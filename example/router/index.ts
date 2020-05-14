import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Framework from '../views/framework/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard*',
    name: 'dashboard',
    component: Framework
  },
  {
    path: '/example*',
    name: 'example',
    component: Framework
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
