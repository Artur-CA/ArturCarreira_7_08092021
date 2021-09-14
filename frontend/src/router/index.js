import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Post from '../views/Post.vue'
import Account from '../views/Account.vue'
import List from '../views/List.vue'
import News from '../views/News.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/post',
    name: 'Post',
    component: Post,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/list',
    name: 'List',
    component: List,
  },
  {
    path: '/news',
    name: 'News',
    component: News,
  }
]

const router = new VueRouter({
  routes
})

export default router
