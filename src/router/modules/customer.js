/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/customer',
  component: Layout,
  redirect: '/customer/list',
  name: 'customer',
  meta: {
    title: '客户意向',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/customer/list'),
      name: 'CustomerList',
      meta: { title: '客户意向' }
    },
    {
      path: ':id',
      props: true,
      hidden: true,
      component: () => import('@/views/customer/detail'),
      name: 'CustomerDetail',
      meta: { title: '查看沟通记录' }
    },
    {
      path: 'upt/:id',
      props: true,
      hidden: true,
      component: () => import('@/views/customer/update'),
      name: 'CustomerUpdate',
      meta: { title: '修改沟通记录' }
    }
  ]
}
export default tableRouter
