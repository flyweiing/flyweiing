import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index') },
  { path: '/404', component: () => import('@/views/404') },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index')
      },
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        children: [
          {
            path: 'light',
            component: () => import('@/views/dashboard/components/light')
          },
          {
            path: 'camera',
            component: () => import('@/views/dashboard/components/camera')
          },
          {
            path: 'led',
            component: () => import('@/views/dashboard/components/led')
          },
          {
            path: 'wifi',
            component: () => import('@/views/dashboard/components/wifi')
          },
          {
            path: 'charger',
            component: () => import('@/views/dashboard/components/charger')
          },
          {
            path: 'airing',
            component: () => import('@/views/dashboard/components/airing')
          },
          {
            path: 'help',
            component: () => import('@/views/dashboard/components/help')
          },
          {
            path: 'rgb',
            component: () => import('@/views/dashboard/components/rgb')
          },
          {
            path: 'usb',
            component: () => import('@/views/dashboard/components/usb')
          }
        ]
      },
      {
        path: 'chart',
        component: () => import('@/views/chart/index')
      },
      {
        path: 'strategy',
        component: () => import('@/views/strategy/index')
      },
      {
        path: 'system',
        component: () => import('@/views/system/index')
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

