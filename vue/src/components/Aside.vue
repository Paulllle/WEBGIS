<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Aside"
})
</script>

<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246);height:100vh;">
    <el-menu :default-openeds="['1', '3']" style="height:100vh;overflow: hidden;"
    router>
      <div style="height: 60px;line-height: 60px;text-align: center;">
        <img src="../assets/logo.png" alt="" style="width: 30px;position: relative;top: 3px;margin-right: 3px" >
        <b>管理员后台管理系统</b>
      </div>

      <el-menu-item index="/admin/home">
        <template slot="title">
          <i class="el-icon-house"></i>
          <span slot="title">主页</span>
        </template>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="/admin/users">用户账号管理</el-menu-item>
          <el-menu-item index="/admin/commentmanage">用户评论管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-menu"></i>数据管理</template>
        <el-menu-item-group>
          <template slot="title">景区数据管理</template>
          <el-menu-item index="/admin/jqm">数据管理</el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>

    </el-menu>
  </el-aside>
</template>

<style scoped>

</style>