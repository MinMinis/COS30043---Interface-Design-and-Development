import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '@/components/TheHome.vue'
import TheTasks from '@/components/TheTasks.vue'
import TheUnits from '@/components/TheUnits.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheHome
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TheTasks
    },
    {
      path: '/units',
      name: 'units',
      component: TheUnits
    }
  ]
})

export default router
