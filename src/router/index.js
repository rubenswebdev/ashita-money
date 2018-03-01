import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  linkExactActiveClass: "active",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Dashboard,
      meta: {
        humanName: 'Home',
        showOnNav: true,
      }
    },
  ]
})
