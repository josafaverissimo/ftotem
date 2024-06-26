import { createRouter, createWebHistory } from 'vue-router'
import { validateToken } from "@/services/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/event/:hash',
      name: 'eventShow',
      component: () => import('../views/EventShowView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/:pathMatch(.*)',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue'),
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
