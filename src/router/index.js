import { createRouter, createWebHistory } from 'vue-router'
import CreateQR from '../views/CreateQR.vue'
import EnterQR from '@/views/EnterQR.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'enter',
      component: EnterQR,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateQR,
    },
    {
      path: '/read',
      name: 'read',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ReadQR.vue')
    },
    {
      path: '/readCamera',
      name: 'readCamera',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ReadQRCamera.vue'),
    },
  ],
})

export default router
