import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message} from "element-ui";

Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'welcome', redirect:"/login"
},
  {path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),meta:{title:"旅游综合查询系统登录面"}},
  {path: '/register', name: 'Register', component: () => import(/* webpackChunkName: "about" */ '../views/register.vue'),},
  {
    path: '/front', name: 'Front', component: () => import(/* webpackChunkName: "about" */ '../views/front/fronthome.vue'),
    meta:{title:"旅游综合查询系统"},
    redirect:"/front/mainpage",
    children: [
      {path: 'mainpage', name: 'Mainpage', component: () => import(/* webpackChunkName: "about" */ '../views/front/mainpage.vue'),meta:{title:"旅游综合查询系统"},},
      {path: 'frontperson', name: 'Frontperson', component: () => import(/* webpackChunkName: "about" */ '../views/front/frontPerson.vue'),},
      {path: 'aboutus', name: 'Aboutus', component: () => import(/* webpackChunkName: "about" */ '../views/front/Aboutus.vue'),},
      {path: 'frontPoi', name: 'FrontPoi', component: () => import(/* webpackChunkName: "about" */ '../views/front/frontPoi.vue'),},
      {path: 'mapdaohang', name: 'MapdaoHang', component: () => import(/* webpackChunkName: "about" */ '../views/front/mapdaohang.vue'),},
      {path: 'frontMapcount', name: 'FrontMapcount', component: () => import(/* webpackChunkName: "about" */ '../views/front/frontMapcount.vue'),},
      {path: 'frontMapshow', name: 'FrontMapshow', component: () => import(/* webpackChunkName: "about" */ '../views/front/frontMapshow.vue'),},
      {path: 'frontratedad', name: 'frontratedad', component: () => import(/* webpackChunkName: "about" */ '../views/front/frontratedad.vue'),},
      {path: 'typhoon', name: 'Typhoon', component: () => import(/* webpackChunkName: "about" */ '../views/front/typhoonvue.vue'),},
      {path: 'frontrate', name: 'FrontRate', component: () => import(/* webpackChunkName: "about" */ '../views/front/frontrate.vue'),},
    ],
  },
  
  {
    path: '/admin',
    name: 'manage',
    component: () => import(/* webpackChunkName: "about" */ '../views/Manage.vue'),
    meta:{title:"旅游综合查询后台管理系统"},
    redirect:"/admin/home",
    children:[
      {path: 'home', name: 'Home', component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),meta:{title:"旅游综合查询后台管理系统"},},
      {path: 'users', name: 'User', component: () => import(/* webpackChunkName: "about" */ '../views/Usermanage.vue'),},
      {path: 'jqm', name: 'Jqm', component: () => import(/* webpackChunkName: "about" */ '../views/JQmange.vue'),},
      {path: 'commentmanage', name: 'CommentManage', component: () => import(/* webpackChunkName: "about" */ '../views/CommentManage.vue'),},
      {path: 'person', name: 'Person', component: () => import(/* webpackChunkName: "about" */ '../views/Person.vue'),},
    ],
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})





export default router
