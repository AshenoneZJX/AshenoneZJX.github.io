import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cars from '../views/Cars.vue'
import Records from '../views/Records.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cars',
    name: 'Cars',
    component: Cars
  },
  {
    path: '/records',
    name: 'Records',
    component: Records
  }
]

const router = new VueRouter({
  mode: 'history', // 去掉 URL 中的 #
  routes
})

export default router