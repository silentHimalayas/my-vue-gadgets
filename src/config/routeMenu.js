import quillEdit from '@/views/quillEdit'

const routeMap = [
  {
    path: '/',
    name: '首页',
    redirect: '/quillEdit'
  },
  {
    path: '/quillEdit',
    name: '富文本编辑器',
    component: quillEdit,
    meta: {}
  }
]
export default routeMap;