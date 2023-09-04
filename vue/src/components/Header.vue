<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "mHeader",
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
      this.$router.push("/admin/person")
    }
  }
})
</script>

<template>
  <div style="line-height: 60px; display: flex">
    <div style="flex: 1;">
    </div>
    <el-dropdown style="width: 70px; cursor: pointer">
      <span>{{user.username}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <span style="text-decoration: none" @click="modifry">个人信息</span>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0" >
          <span style="text-decoration: none" @click="logout">退出系统</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<style scoped>
.el-dropdown{
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-dropdown-selfdefine{
 font-size: 25px;
 color: #000;
}
</style>