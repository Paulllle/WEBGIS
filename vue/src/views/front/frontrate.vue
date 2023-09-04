<script>
import {defineComponent} from 'vue'
export default defineComponent({
  name: "FrontRate",
  data(){
    return {
     comment:{
      userrate:3,   
      content:'', 
      uid:'',
      username:'',
      jqid:1,
      token:''    
     },
     jqitem:{
      jqid:1,
      jqurl:'',
      jqcontent:'',
      jqname:''
     },
     user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
     commonratingvalue:5,
     othercomments:[]
    }
  },
  mounted(){
    //测试本地是否存储用户信息
     console.log(this.user.username);
    this.loadfrobus();
    this.loadrate();
      console.log(this.jqitem.jqid+"传进来了2")

  },
  computed:{
    reversedItemList() {
      // 使用 reverse() 方法将列表反转，并返回新的数组,让最新的评论在第一位
      return this.othercomments.reverse();
    }
  },
  methods:{
    // 提交评论时触发
    submit(){
      //comment数组存储当前用户信息以及评论景区的id
      this.comment.uid=this.user.uid
      this.comment.username=this.user.username
      this.comment.token=this.user.token
      this.comment.jqid=this.jqitem.jqid
      console.log(this.comment)
      //向后端发送数据
      this.request.post('/comment',this.comment).then(res=>{
        console.log('上传成功')
        this.$message.success('评价成功!')  
        this.loadrate()    
      })
     //当评论完后，清空自己的评论框内容
      this.comment.content=''
    },
   //加载后端数据
    loadrate(){ 
      //获取数据,让响应式数据othercomments来获取用户的评论,而commonratingvalue是后端发送的景区平均评分
      this.request.get(`/comment?jqid=${this.jqitem.jqid}`).then(res=>{
      console.log("景区评论"+res.jqid);
      console.log(res);
      this.commonratingvalue=res.rate
      this.othercomments=res.comments
        })
    },
    //这里用到了VueX插件，这个插件用于兄弟模块之间的数值交换,一开始是想用eventbus传值，但发现虽然另一组建的值传过来了，但是本组件的数据却没有被赋值
    loadfrobus(){
      console.log(this.$store.state.data)
      this.jqitem=this.$store.state.data;  
    }
  }
})
</script>
<template>
    <!-- 相当于html的body部分 -->
  <div id="ratingbox">
      <!-- 提供返回子系统开始页面的方法 -->
      <el-button @click="$router.push('/front/frontratedad')" style="position: relative;left: -450px;">返回</el-button>
   
    <div class="JQcontent" >    
      <img :src="jqitem.jqurl" alt="">     
      <div>
        <h1 style="text-align: center;">{{jqitem.jqname}}</h1>
        <span>景区评分</span>
        <!-- 使用element-ui插件提供的打分,v-model是vue框架用于标签与数据双向绑定 -->
        <el-rate
        v-model="commonratingvalue"
        show-text :texts="['极差', '不推荐', '一般', '比较满意', '值得一去'] "
        disabled     
        >
      </el-rate>
      <p>{{jqitem.jqcontent}}</p>
      </div>   
    </div>

    <div class="JQrate">
      <span>你对景区的评分:</span>
        <el-rate
        v-model="comment.userrate" 
        show-text :texts="['极差', '不推荐', '一般', '比较满意', '值得一去'] " 
        allow-half
        >
      </el-rate>
      <div class="textplace">
        <el-input type="textarea" placeholder="发表您对景区的看法和建议" v-model="comment.content"></el-input>
        <el-button @click="submit">提交</el-button>
      </div>
    </div>
    <div style="overflow: scroll; height: 500px;">
      <p>评论列表:</p> 
      <div class="otherrate" v-for="(item,index) in reversedItemList" :key="index">
       <div>
        <span>{{item.username}}</span>  <span>发表于:{{ item.createtime }}</span>
       <el-rate
        show-text :texts="['极差', '不推荐', '一般', '比较满意', '值得一去'] "
        disabled 
        v-model="item.userrate"    
        >
      </el-rate>
      <div class="textplace">{{ item.content }}</div>
       </div>
  </div>
    </div>
  </div>
</template>
<style scoped>
#ratingbox{
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0; 
  width: 1000px;
  height: 1000px;
  border: 1px solid #ccc;
}
.JQcontent img{
  height: 300px;
  width: 300px;
}
.JQcontent{
display: flex;
width: 800px;
height: 300px;
margin-top: 20px; ;
flex-direction: row;
}
.textplace{
  margin: 10px;
  width: 700px;
  display: flex;
  flex-direction: column;
}
.JQrate{
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 30px;
}
.textplace button{
  width: 70px;
  height: 30px;
  text-align: center;
  margin: 10px;
  align-self: self-end;
}
.otherrate{
  border: 1px solid #ccc;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
</style>