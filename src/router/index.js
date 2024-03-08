import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ManagerListView from   '../views/Manager/ManagerListView.vue'
import ManagerDetailView from   '../views/Manager/ManagerDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/manager',
      name: 'ManagerList',
      component: ManagerListView
    },
    {
      path: '/manager/:mngrId',
      name: 'ManagerDetail',
      component: ManagerDetailView,
      props: true,
      // props: route => ({ id: parseInt(route.params.id) }),
    },
  ]
})

export default router
