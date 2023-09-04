<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "register",
  data(){
    return{
      user:{},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到  个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        confirmpassword: [
          { required: true, message: '请确认输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  methods:{
    register(){
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          // 表单校验合法
          if(this.user.password!==this.user.confirmpassword){
            this.$message.error("两次密码输入有误!")
            return false
          }
          this.request.post("/users/register", this.user).then(res => {
            if(res.code === '200') {
              localStorage.setItem("user", JSON.stringify(res.data))  // 存储用户信息到浏览器
              this.$router.push("/login")
              this.$message.success("注册成功")
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      });
    },
  },
})
</script>

<template>
  <div class="container">
    <div class="login-box">
      <h2>旅游综合查询系统</h2>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input v-model="user.username" prefix-icon="el-icon-user" placeholder="输入用户名" style="margin: 10px"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" prefix-icon="el-icon-lock" show-password placeholder="输入密码" style="margin: 10px"></el-input>
        </el-form-item>
        <el-form-item prop="confirmpassword">
          <el-input v-model="user.confirmpassword" prefix-icon="el-icon-lock" show-password placeholder="请再次输入密码" style="margin: 10px"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="primary"  @click="register">确定</el-button>
          <el-button type="warning"  @click="$router.push('/login')">返回登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
*{
  padding: 0;
  margin: 0;
  text-decoration: none;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-image: url('./1.jpg');
}

.login-box {
  width: 350px;
  height: 350px;
  background-color: #fff;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0 2px 5px #ccc;
  background-color: rgba(255, 255, 255,0.5);
  backdrop-filter:blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-box h2 {
  margin-bottom: 20px;
}
.btn{
  display: flex;
  justify-content: space-around;
}
.btn button{
  width: 80px;
  height: 30px;
}
.login-box h2 {
  margin-bottom: 20px;
}
.login-box input[type="text"],
.login-box input[type="password"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}



</style>