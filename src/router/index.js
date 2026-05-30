import { createRouter, createWebHistory } from 'vue-router'

import PortfolioView from '../views/PortfolioView.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    component: PortfolioView,
  },

  {
    path: '/admin-login',
    component: AdminLogin,
  },

  {
    path: '/admin-dashboard',
    component: AdminDashboard,

    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem('adminLoggedIn')

      if (loggedIn === 'true') {
        next()
      } else {
        next('/admin-login')
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router