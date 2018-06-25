import Vue from 'vue'
import Router from 'vue-router'
import MainContent from '@/components/MainContent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainContent',
      component: MainContent
    }
  ]
})
