import Vue from 'vue'
import Router from 'vue-router'
import Mother from '@/components/Mother'
import Landing from '@/components/Landing'

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
      path: '/app',
      name: 'Mother',
      component: Mother
    }
  ]
})
