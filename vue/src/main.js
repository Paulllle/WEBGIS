import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css';
import router from './router'
import request from "@/utils/request";
import VueWechatTitle from 'vue-wechat-title';
import {Message} from 'element-ui'
import store from './store'
import Vuex from 'vuex'


Vue.prototype.$message = function(msg){
  return Message({
    message: msg,
    duration: 1000
  })
}
Vue.use(Vuex);
Vue.use(VueWechatTitle);
Vue.config.productionTip = false
;
Vue.use(ElementUI,{size:"small"});
Vue.prototype.request=request//main.js全局使用axios封装request
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// 重写ElementUI提示时长
Vue.prototype.$message = function (msg) {
  ElementUI.Message(msg)
}
Vue.prototype.$message.success = function (msg) {
  return ElementUI.Message.success({
    message: msg,
    duration: 1000
  })
}
Vue.prototype.$message.warning = function (msg) {
  return ElementUI.Message.warning({
    message: msg,
    duration: 1000
  })
}