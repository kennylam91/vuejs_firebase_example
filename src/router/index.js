import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/create',
      name: 'Create',
      component: () => import('@/components/Create.vue')
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: () => import('@/components/Create.vue')
    }
  ]
})
