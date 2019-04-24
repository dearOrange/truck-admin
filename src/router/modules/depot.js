/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/depot',
  component: Layout,
  redirect: '/depot/list',
  name: 'depot',
  meta: {
    title: '出租管理',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/depot/list'),
      name: 'DepotList',
      meta: { title: '出租列表' }
    },
    {
      path: ':id',
      props: true,
      hidden: true,
      component: () => import('@/views/depot/detail'),
      name: 'DepotDetail',
      meta: { title: '出租详情' }
    },
    {
      path: 'upt/:id',
      props: true,
      hidden: true,
      component: () => import('@/views/depot/update'),
      name: 'DepotUpdate',
      meta: { title: '修改出租信息' }
    }
  ]
}
export default tableRouter
