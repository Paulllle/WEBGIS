<script>
import {defineComponent} from 'vue'
export default defineComponent({
  name: "FHeader",
   data(){
    return{
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
    }
   },
  methods:{
    logout(){//退出系统时清除浏览器本地存储
this.$router.push("/login")
      localStorage.removeItem("user")

      this.$message.success("退出成功")
    },
    modifry(){
      //避免重复进入
      const targetRoute = "/front/frontperson";
      if (this.$route.path !== targetRoute) {
        this.$router.push(targetRoute);
      }
    }
  }
})
</script>
<template>
 
  <div class="header">
    <h1>旅游综合查询系统</h1>
    <div class="nav-bar">      
        <router-link to= "/front/mainpage" class="nav-bar-a">首页</router-link>       
        <router-link to= "/front/frontMapshow" class="nav-bar-a">旅游信息分享</router-link>
        <router-link to= "/front/frontMapcount" class="nav-bar-a">城市数据查询</router-link> 
        <router-link to= "/front/frontratedad" class="nav-bar-a">旅游景区景点评价</router-link>
        <router-link to= "/front/mapdaohang" class="nav-bar-a">旅游路线导航</router-link>
        <router-link to= "/front/frontPoi" class="nav-bar-a">景区POI</router-link>
        <router-link to= "/front/typhoon" class="nav-bar-a">近期台风信息</router-link> 
        <router-link to= "/front/frontperson" class="nav-bar-a">个人中心</router-link>
        <router-link to= "/front/aboutus" class="nav-bar-a">关于我们</router-link>         
    </div>
    
      <div id="fordrop">
        <el-dropdown >
      <span>{{user.username}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown" style="width: 8vw; text-align: center">
        <el-dropdown-item style="font-size: 2vh; padding: 5px 0">
          <span style="text-decoration: none" @click="modifry">个人信息</span>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 2vh; padding: 5px 0" >
          <span style="text-decoration: none" @click="logout">退出系统</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      </div>
      
  </div>
</template>
<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.header{
  height: 10vh;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  
  display: flex;  
  justify-content: space-around; 
  position: fixed;
  z-index: 999;
}
.header h1{
  height: 100%;
  width: 30%;
  overflow: hidden;
  line-height: 9vh;
  position: absolute;
  left: 1vw;
}
.nav-bar{
  height: 10vh;
  display: flex;
  margin:  0 5px;
  list-style: none;
  position: absolute;
  overflow: hidden;
}
.nav-bar a{
  text-decoration: none;
  height: 100%;
  width: 7vw;
  text-align: center;
  line-height: 10vh;
  font-size: 15px;
  color: rgb(37,175,243);
}
.nav-bar-a:hover{
  background-color: #ccc;
  color: #fff;
}
.fordrop{  
  display: flex;
  position: relative;
}
.el-dropdown{
  height: 100%;
  
  cursor: pointer;
  display: flex;
  top:50%;
  transform: translateY(-50%);
  align-items: center;
  position: absolute;
  right: 10vw;
  
}
.el-dropdown-selfdefine{
 font-size: 20px;
 color: #000;
 
}
</style>