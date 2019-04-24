/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/profile',
  component: Layout,
  redirect: '/profile/list',
  name: 'profile',
  meta: {
    title: '用户管理',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/profile/list'),
      name: 'ProfileList',
      meta: { title: '用户列表' }
    },
    {
      path: ':id',
      props: true,
      hidden: true,
      component: () => import('@/views/profile/detail'),
      name: 'ProfileDetail',
      meta: { title: '查看用户详情' }
    },
    {
      path: 'upt/:id',
      props: true,
      hidden: true,
      component: () => import('@/views/profile/update'),
      name: 'ProfileUpdate',
      meta: { title: '修改用户信息' }
    }
  ]
}
export default tableRouter
