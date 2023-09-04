<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "JQmange",
  data(){
    return {
      tableData: [],
      pageNum:1,
      pageSize:10,
      
      form:{},
      dialogTableVisible: false,
      dialogFormVisible: false,
      content:'',
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
      this.request.get("/comment/page/",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          content:this.content,
        }
      }).then(res=>{
        console.log(res)
        this.tableData=res.records
        this.total = res.total
      })
    },
   
    handleEdit(row){
      this.form=JSON.parse(JSON.stringify(row))
      this.dialogFormVisible=true
    },
    handleDelete(id){
     this.request.delete("/comment/"+id).then(res =>{
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
      let cids = this.multipleSelection.map(value => value.cid) //[{},{},{}]=>[1,2,3]把对象数组变纯id数组
      this.request.delete("/comment/del/batch", {data:cids}).then(res=>{
        if(res.data){
          this.$message.success("批量删除成功")
        }else{
          this.$message.error("批量删除失败")
        }
        this.loadfetch()
      })
    },
    save(){
      this.request.post("/comment",this.form).then(res=>{
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
      this.content=""
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
  }
})
</script>

<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户评论管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="padding: 10px 0;display: flex;justify-content: center">
    <el-input placeholder="请输入评论关键词" v-model="content" class="input-with-select" style="width: 500px" >
      <el-button slot="append" icon="el-icon-search" @click="loadfetch"></el-button>
    </el-input>
    <el-button type="warning" style="margin-left: 30px" @click="reset">重置</el-button>
    
    <el-popconfirm
        confirm-button-text='确定'
        cancel-button-text='算了'
        icon="el-icon-info"
        icon-color="red"
        title="是否删除该景区？"
        @confirm="batchdel"
    >
      <el-button slot="reference" type="danger" style="margin-left: 20px" >批量删除</el-button>
    </el-popconfirm>
  </div>
  <el-table :data="tableData" @selection-change="handleSelectionChange" >
    <el-table-column
        type="selection"
        width="55">
    </el-table-column>
    <el-table-column prop="cid" label="评论id" width="140" >
    </el-table-column>
    <el-table-column prop="jqid" label="景区id" width="140">
    </el-table-column>
    <el-table-column prop="uid" label="用户id" width="300" >
    </el-table-column >
    <el-table-column prop="content" label="评论内容" width="300">
    </el-table-column>
    <el-table-column prop="createtime" label="发表时间" width="140">
    </el-table-column>
    <el-table-column prop="userrate" label="用户评分" width="140">
    </el-table-column>
    
    <el-table-column>
      <template slot-scope="scope">
        
        <el-popconfirm
            confirm-button-text='确定'
            cancel-button-text='算了'
            icon="el-icon-info"
            icon-color="red"
            title="是否删除该评论？"
            @confirm="handleDelete(scope.row.cid)"
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
  </div>

</template>

<style scoped>

</style>