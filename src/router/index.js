import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/Create-Campaign',
    name: 'Create-Campaign',
    component: () => import(/* webpackChunkName: "about" */ '../views/Create-Campaign.vue')
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/EditProfile',
    name: 'EditProfile',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditProfile.vue')
  },
  {
    path: '/Campaign-Dashboard',
    name: 'Campaign-Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Campaign-Dashboard.vue')
  },
  {
    path: '/Campaign/:id',
    name: 'Campaign',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Campaign.vue')
  },
  {
    path: '/Watchlist',
    name: 'Watchlist',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Watchlist.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
