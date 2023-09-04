<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "JQmange",
  data(){
    return {
      tableData: [],
      pageNum:1,
      pageSize:10,
      jqname:'',
      form:{},
      dialogTableVisible: false,
      dialogFormVisible: false,
      jqid:'',
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
      this.request.get("/jq/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          jqname:this.jqname,
        }
      }).then(res=>{
        console.log(res)
        this.tableData=res.records
        this.total = res.total
      })
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
     this.request.delete("/jq/"+id).then(res =>{
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
      let jqids = this.multipleSelection.map(value => value.jqid) //[{},{},{}]=>[1,2,3]把对象数组变纯id数组
      this.request.delete("/jq/del/batch", {data:jqids}).then(res=>{
        if(res.data){
          this.$message.success("批量删除成功")
        }else{
          this.$message.error("批量删除失败")
        }
        this.loadfetch()
      })
    },
    save(){
      this.request.post("/jq",this.form).then(res=>{
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
      this.jqname=""
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
      <el-breadcrumb-item>景区数据管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="padding: 10px 0;display: flex;justify-content: center">
    <el-input placeholder="请输入景区名" v-model="jqname" class="input-with-select" style="width: 500px" >
      <el-button slot="append" icon="el-icon-search" @click="loadfetch"></el-button>
    </el-input>
    <el-button type="warning" style="margin-left: 30px" @click="reset">重置</el-button>
    <el-button type="primary" style="margin-left: 60px" @click="handleAdd">新增景区</el-button>
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
    <el-table-column prop="jqid" label="景区id" width="140" >
    </el-table-column>
    <el-table-column prop="jqname" label="景区名" width="140">
    </el-table-column>
    <el-table-column prop="jqurl" label="景区图片url" width="300" >
    </el-table-column >
    <el-table-column prop="jqcontent" label="景区描述" width="300">
    </el-table-column>
    <el-table-column prop="lat" label="纬度" width="140">
    </el-table-column>
    <el-table-column prop="lng" label="经度" width="140">
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
            title="是否删除该景区？"
            @confirm="handleDelete(scope.row.jqid)"
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
    <el-dialog title="景区信息" :visible.sync="dialogFormVisible" width="30%" >
    <el-form :model="form" label-width="100px" size="small">
      <el-form-item label="景区名" >
        <el-input v-model="form.jqname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="景区图片url" >
        <el-input v-model="form.jqurl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="景区描述" >
        <el-input v-model="form.jqcontent" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="纬度" >
        <el-input v-model="form.lat" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="经度" >
        <el-input v-model="form.lng" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
  </div>
  </div>

</template>

<style scoped>

</style>