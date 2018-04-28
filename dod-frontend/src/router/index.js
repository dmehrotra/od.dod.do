import Vue from 'vue'
import Router from 'vue-router'
import Wrapper from '@/components/layouts/Wrapper'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Wrapper',
      component: Wrapper
    }
  ]
})
