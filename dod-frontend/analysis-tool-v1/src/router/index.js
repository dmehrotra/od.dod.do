import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Mother from '@/components/Mother'
import Landing from '@/components/Landing'


import GridTest from '@/components/GridTest'
import Layout from '@/components/Layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/app',
      name: 'Mother',
      component: Mother
    },
    {
      path: '/layout',
      name: 'Layout',
      component: Layout
    }
  ]
})
