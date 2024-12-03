import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'App',
      component: () => import('@/App.vue'),
    },
   {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login.vue' as string),
   },
   {
      path:'/datashow',
      name:'DataShow',
      meta:{
        requiresAuth:true
      },
      component:()=>import('@/views/datashow.vue' as string)
   }
   

  ],
})



export default router
