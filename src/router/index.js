import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue';

import DefaultLayout from '../layouts/DefaultLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard', name: 'dashboard', component: () => import('@/views/Dashboard.vue'),
        }
      ]
    },
    {
      path: '/auth',
      redirect: '/login',
      component: AuthLayout,
      meta: { isGuest: true },
      children: [
        {
          path: '/login', name: 'login', component: () => import('@/views/Auth/Login.vue'),
        }
      ]
    },
  ],
})

export default router
