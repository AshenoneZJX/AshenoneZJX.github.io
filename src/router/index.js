import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cars from '../views/Cars.vue'
import Records from '../views/Records.vue'
import RecordDetail from '../views/RecordDetail.vue'
import MySpace from '../views/MySpace.vue'
import MySpaceOverview from '../views/MySpaceOverview.vue'
import Digital from '../views/Digital.vue'
import Photography from '../views/Photography.vue'
import CarDetail from '../views/CarDetail.vue'
import CarBasics from '../views/CarBasics.vue'
import CarBasicsDetail from '../views/CarBasicsDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mySpace',
    component: MySpace,
    children: [
      { path: '', name: 'MySpace', component: MySpaceOverview },
      { path: 'cars', name: 'Cars', component: Cars },
      { path: 'cars/:id', name: 'CarDetail', component: CarDetail },
      { path: 'digital', name: 'Digital', component: Digital },
      { path: 'photography', name: 'Photography', component: Photography },
      { path: 'car-basics', name: 'CarBasics', component: CarBasics },
      { path: 'car-basics/:id', name: 'CarBasicsDetail', component: CarBasicsDetail }
    ]
  },
  {
    path: '/records',
    name: 'Records',
    component: Records
  },
  {
    path: '/records/:id',
    name: 'RecordDetail',
    component: RecordDetail
  }
]

const router = new VueRouter({
  mode: 'history', // 去掉 URL 中的 #
  routes
})

export default router
