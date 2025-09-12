import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/destinations",
    name: "destinations",
    component: () => import("@/views/Destinations.vue")
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("@/views/Calendar.vue")
  },
  {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import("@/views/NotFound.vue")
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
