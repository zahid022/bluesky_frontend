import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'
import RegisterView from '@/views/login/RegisterView.vue'
import UserView from '@/views/UserView.vue'
import NotificationView from '@/views/NotificationView.vue'
import FollowersView from '@/views/FollowersView.vue'
import FollowsView from '@/views/FollowsView.vue'
import Profile from '@/views/Profile.vue'
import PostDetailView from '@/views/PostDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'public',
      meta: {
        requiredAuth : true,
        layout: 'Layout',
      },
      children: [
        {
          path: '',
          name: "home",
          component: HomeView
        },
        {
          path: 'user/:id',
          name: "userDetail",
          component: UserView
        },
        {
          path: 'profile',
          name: "profile",
          component: Profile
        },
        {
          path: 'notification',
          name: "notification",
          component: NotificationView
        },
        {
          path: 'followers',
          name: "followers",
          component: FollowersView
        },
        {
          path: 'follows',
          name: "follows",
          component: FollowsView
        },
        {
          path : 'post/:id',
          name : 'postDetail',
          component : PostDetailView
        }
      ],
    },
    {
      path: '/settings',
      redirect : '/settings/login',
      name: 'login',
      meta: {
        requiredAuth : false,
        layout: 'Login',
      },
      children: [
        {
          path: 'login',
          name: "signin",
          component: LoginView
        },
        {
          path: 'register',
          name: "signup",
          component: RegisterView
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token') 
  token = token ? JSON.parse(token) : null

  if (to.meta.requiredAuth && !token) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
