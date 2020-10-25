import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element, {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import './assets/icon/iconfont.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$http = axios;
Vue.prototype.$message = Message


axios.defaults.baseURL = "http://localhost:8088/api"
axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem("token")
  return config
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
