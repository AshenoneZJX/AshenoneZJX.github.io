import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Cars from '@/views/MySpace/Car/Cars.vue'
import CarsHome from '@/views/MySpace/Car/CarsHome.vue'
import Records from '@/views/Records/Records.vue'
import RecordDetail from '@/views/Records/RecordDetail.vue'
import MySpace from '@/views/MySpace/MySpace.vue'
import Digital from '@/views/MySpace/Digital/Digital.vue'
import Photography from '@/views/MySpace/Photography/Photography.vue'
import CarDetail from '@/views/MySpace/Car/CarDetail.vue'
import CarBasics from '@/views/MySpace/Car/CarBasics.vue'
import CarBasicsDetail from '@/views/MySpace/Car/CarBasicsDetail.vue'
import BrandList from '@/views/MySpace/Car/BrandList.vue'
import BrandDetail from '@/views/MySpace/Car/BrandDetail.vue'
import Learning from '@/views/Learning/Learning.vue'
import LearningOverview from '@/views/Learning/LearningOverview.vue'
import IeltsLearning from '@/views/Learning/IeltsLearning.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mySpace',
    name: 'MySpace',
    component: MySpace
  },
  { path: '/mySpace/cars-home', name: 'CarsHome', component: CarsHome },
  { path: '/mySpace/cars', name: 'CarsModels', component: Cars },
  { path: '/mySpace/cars/:id', name: 'CarDetail', component: CarDetail },
  { path: '/mySpace/digital', name: 'Digital', component: Digital },
  { path: '/mySpace/photography', name: 'Photography', component: Photography },
  { path: '/mySpace/car-basics', name: 'CarBasics', component: CarBasics },
  { path: '/mySpace/car-basics/:id', name: 'CarBasicsDetail', component: CarBasicsDetail },
  { path: '/mySpace/brands', name: 'BrandList', component: BrandList },
  { path: '/mySpace/brands/:name', name: 'BrandDetail', component: BrandDetail },
  {
    path: '/records',
    name: 'Records',
    component: Records
  },
  {
    path: '/records/:id',
    name: 'RecordDetail',
    component: RecordDetail
  },
  {
    path: '/learning',
    component: Learning,
    children: [
      { path: '', name: 'LearningOverview', component: LearningOverview },
      { path: 'ielts', name: 'IeltsLearning', component: IeltsLearning }
    ]
  }
]

const router = new VueRouter({
  mode: 'history', // 去掉 URL 中的 #
  routes
})

export default router
