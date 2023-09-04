<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Usermanage.vue",
  data(){
    return {
      tableData: [],
      pageNum:1,
      pageSize:10,
      username:'',
      form:{},
      dialogTableVisible: false,
      dialogFormVisible: false,
      uid:'',
      total:0,
      input1: '',
      input2: '',
      select: '',
      multipleSelection: []
    }
  },
  created(){
    //请求后端分页查询数据
    this.loadfetch()
  },
  methods:{
    loadfetch() {
      this.request.get("/users/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          username:this.username,
        }
      }).then(res=>{
        console.log(res)
        this.tableData=res.records
        this.total = res.total
      })
      // fetch("http://localhost:9090/users/page?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize + "&username=" + this.username).then(res => res.json()).then(res => {
      //   console.log(res)
      //   this.tableData = res.records;//mybatis plus返回的records
      //   this.total = res.total;
      // })
    },
    handleAdd() {
      this.dialogFormVisible=true
      this.form={}
    },
    handleEdit(row){
      this.form=JSON.parse(JSON.stringify(row))
      this.dialogFormVisible=true
    },
    handleDelete(id){
     this.request.delete("/users/"+id).then(res =>{
        if(res.data){
          this.$message.success("删除成功")
        }else{
          this.$message.error("删除失败")
        }
        this.loadfetch()
      })
    },
    handleSelectionChange(val){
      console.log(val)
      this.multipleSelection = val
    },
    batchdel() {
      let uids = this.multipleSelection.map(value => value.uid) //[{},{},{}]=>[1,2,3]把对象数组变纯id数组
      this.request.delete("/users/del/batch", {data:uids}).then(res=>{
        if(res.data){
          this.$message.success("批量删除成功")
        }else{
          this.$message.error("批量删除失败")
        }
        this.loadfetch()
      })
    },
    save(){
      this.request.post("/users",this.form).then(res=>{
        if(res.data){
          this.$message.success("添加成功")
        }else{
          this.$message.error("添加失败")
        }
        this.dialogFormVisible=false
        this.loadfetch()
      })
    },
    reset(){
      this.username=""
      this.loadfetch()
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.loadfetch()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.loadfetch()
    }
  },
})
</script>

<template>
<div>
  <el-breadcrumb separator="/admin">
    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
  <div style="padding: 10px 0;display: flex;justify-content: center">
    <el-input placeholder="请输入用户名" v-model="username" class="input-with-select" style="width: 500px" >
      <el-button slot="append" icon="el-icon-search" @click="loadfetch"></el-button>
    </el-input>
    <el-button type="warning" style="margin-left: 30px" @click="reset">重置</el-button>
    <el-button type="primary" style="margin-left: 60px" @click="handleAdd">新增用户</el-button>
    <el-popconfirm
        confirm-button-text='确定'
        cancel-button-text='算了'
        icon="el-icon-info"
        icon-color="red"
        title="是否删除该用户？"
        @confirm="batchdel"
    >
      <el-button slot="reference" type="danger" style="margin-left: 20px" >批量删除</el-button>
    </el-popconfirm>
  </div>
  <el-table :data="tableData" @selection-change="handleSelectionChange">>
    <el-table-column
        type="selection"
        width="55">
    </el-table-column>
    <el-table-column prop="uid" label="id" width="140">
    </el-table-column>
    <el-table-column prop="username" label="用户名" width="140">
    </el-table-column>
    <el-table-column prop="password" label="密码" width="140">
    </el-table-column >
    <el-table-column prop="email" label="邮箱" width="140">
    </el-table-column>
    <el-table-column prop="phone" label="电话" width="140">
    </el-table-column>
    <el-table-column prop="nickname" label="权限" width="140">
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
        <el-popconfirm
            confirm-button-text='确定'
            cancel-button-text='算了'
            icon="el-icon-info"
            icon-color="red"
            title="是否删除该用户？"
            @confirm="handleDelete(scope.row.uid)"
        >
          <el-button slot="reference" type="danger" size="mini" style="margin-left: 10px">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <div style="padding: 10px 0">
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
  <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%" >
    <el-form :model="form" label-width="100px" size="small">
      <el-form-item label="用户名" >
        <el-input v-model="form.username" autocomplete="off"></el-input>
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<style scoped>

</style>