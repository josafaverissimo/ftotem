import { createRouter, createWebHistory } from 'vue-router'
import { validateToken } from "@/services/auth.js";
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if(to.meta?.auth) {
    const isTokenValid = await validateToken()

    if(isTokenValid) {
      return next()
    } else {
      return next({name: 'login'})
    }
  } else{
    return next()
  }
})

export default router
