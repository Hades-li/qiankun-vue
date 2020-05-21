import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import QiankunVue from 'src/index'

Vue.config.productionTip = false

Vue.use(QiankunVue)

const qiankunVue = new QiankunVue([
  {
    name: 'dashboard',
    entry: '//localhost:5001',
    activeRule: '/dashboard'
  },
  {
    name: 'example',
    entry: '//localhost:5002',
    activeRule: '/example'
  }
], {
  sandbox: {
    strictStyleIsolation: false
  }
})
new Vue({
  router,
  store,
  qiankunVue,
  render: h => h(App)
}).$mount('#main')
