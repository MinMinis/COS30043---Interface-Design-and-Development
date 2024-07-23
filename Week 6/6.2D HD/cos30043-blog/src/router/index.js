import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PostsView from '../views/PostsView.vue'
import ProfileView from '../views/ProfileView.vue'
import CreateView from '../views/CreateView.vue'
import PreviewView from '../views/PreviewView.vue'
import PostView from '../views/PostView.vue'
import store from '../store'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Login' }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { title: 'Register' }
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsView,
      meta: { title: 'Posts' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        title: 'Profile',
        requiresAuth: true
      }
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: CreateView,
      meta: {
        title: 'Create Post',
        requiresAuth: true
      }
    },
    {
      path: '/preview-post',
      name: 'preview-post',
      component: PreviewView,
      meta: {
        title: 'Preview Post'
        // requiresAuth: true
      }
    },
    {
      path: '/view-post/:id',
      name: 'view-post',
      component: PostView,
      meta: { title: 'View Post' }
    },
    {
      path: '/my-posts',
      name: 'my-posts',
      component: PostsView,
      meta: {
        title: 'My Posts'
        // requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title} | Blog App`
  if (to.meta.requiresAuth && !store.getters.userId) {
    next({ name: 'login' })
  } else if (to.meta.requiresAuth && store.getters.userId) {
    next()
  } else {
    next()
  }
})
export default router
