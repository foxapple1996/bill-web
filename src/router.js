import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Home from './components/Home'
import Welcome from "./components/Welcome";
import AccountList from "./components/AccountList";
import MateList from "./components/MateList";
import Bill from './components/Bill';

Vue.use(Router)
//重复点击控制台报错设置
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/accountList',
          component: AccountList
        },
        {
          path: '/mateList',
          component: MateList
        },
        {
          path: '/billsys',
          component: Bill
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next();
  const tokenStr = sessionStorage.getItem('token');
  if(!tokenStr) return next('/login')
  return next();
})

export default router