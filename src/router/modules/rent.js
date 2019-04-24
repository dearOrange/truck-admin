/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/rent',
  component: Layout,
  redirect: '/rent/list',
  name: 'rent',
  meta: {
    title: '求租管理',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/rent/list'),
      name: 'RentList',
      meta: { title: '求租列表' }
    },
    {
      path: ':id',
      props: true,
      hidden: true,
      component: () => import('@/views/rent/detail'),
      name: 'RentDetail',
      meta: { title: '求租详情' }
    },
    {
      path: 'upt/:id',
      props: true,
      hidden: true,
      component: () => import('@/views/rent/update'),
      name: 'RentUpdate',
      meta: { title: '修改求租信息' }
    }
  ]
}
export default tableRouter
