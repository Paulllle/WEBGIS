<script>
import {defineComponent} from 'vue'
import res from "core-js/internals/is-forced";

export default defineComponent({
  name: "Person",
  data(){
   return{
     form:{},
     user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
created(){
  this.request.get("/users/username/"+this.user.username).then(res=>{
    if(res.code === '200'){
      this.form = res.data;
    }
  })
},
  methods:{
    save(){
      this.request.post("/users",this.form).then(res=>{
        if(res){
          this.$message.success("保存成功")
        } else{
          this.$message.error("保存失败")
        }
      })
    }
  },
})
</script>

<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="width:500px;padding: 20px;border:1px solid #ccc;margin: 50px">
      <el-form  label-width="100px" size="small">
        <el-form-item label="用户名" >
          <el-input v-model="form.username"  disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">确 定</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>

</template>

<style scoped>

</style>