import quillEdit from '@/views/quillEdit'
import restaurant from '@/views/restaurant'
import home from '@/views'

const routeMap = [
  {
    path: '/',
    name: '首页',
    component: home,
    id: 1,
    meta: {
      index: '1'
    }
  },
  {
    path: '/quillEdit',
    name: '富文本编辑器',
    id: 2,
    component: quillEdit,
    meta: {
      index: '2'
    }
  },
  {
    path: '/restaurant',
    name: 'restaurant',
    id: 3,
    component: restaurant,
    meta: {
      index: '3'
    }
  }
]
export default routeMap;