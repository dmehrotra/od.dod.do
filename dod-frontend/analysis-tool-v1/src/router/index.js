import Vue from 'vue'
import Router from 'vue-router'
import Mother from '@/components/Mother'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Mother',
      component: Mother
    }
  ]
})
