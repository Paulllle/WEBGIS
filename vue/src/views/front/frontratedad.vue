<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Frontratedad",
  data(){
    return{
      jq:{
        jqid:0,
        jqurl:'',
        jqname:'',
        jqcontent:''
      }
    }
  },
  // 钩子函数，在页面挂载时候加载,获取后端提供的景区数据
  mounted(){
    this.request.get('/jq/').then(res=>{
      console.log(res);
      this.jq=res.map(item=>item)
    })
  },
  // VueX插件,将点击的指定景区模块的信息传给跳转的模块
  methods:{
    enterrate(Item){
      this.$store.commit('setData',Item);
      this.$router.push('/front/frontrate') 
    }
  }
})
</script>

<template>
  <div id="introbox">
    <h1>厦门市热门景区景点</h1>
    <div id="box" >   
      <!-- v-for是可以循环产生标签,根据jq数组的长度而定 -->
      <div id="boxitem" v-for="item in jq" :key="item.jqid" >
        <img :src="item.jqurl" alt="图片异常" @click="enterrate(item)">
        <p>{{ item.jqname }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#introbox{
  width: 1000px;
  height: 1000px;
  text-align: center;
}
#box{
  width: 1000px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}
#boxitem{
  width: 200px;
  height: 250px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin: 20px;
  border-radius: 30px;
  overflow: hidden;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  transition: 1s linear;
  box-shadow: 10px 5px 35px #000;
}
#boxitem img{
  width: 200px;
  height: 200px;
}
#boxitem:hover{
  transform: translateY(-10px);
}
</style>