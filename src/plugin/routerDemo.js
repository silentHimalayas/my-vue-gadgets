import MapList from '@/config/routeMenu'

 function plugin (Vue) {
  let location = {
    path: window.location.hash,
  }
  let router = {
    push (hash) {
      location.path = '#' + hash;
      window.location.hash = '#' + hash;
    }
  }
  let routeMap = MapList;
  Vue.mixin({
    beforeCreate () {
        Vue.util.defineReactive(this, '$self_route', location);
    }
    
  })
  Object.defineProperty(Vue.prototype, '$selfRouter', {
    get () { return router}
  })
  Object.defineProperty(Vue.prototype, '$routeMap', {
    get () { return routeMap}
  })
  window.onhashchange = function () {
    location.path = window.location.hash
  }
}
export default plugin;