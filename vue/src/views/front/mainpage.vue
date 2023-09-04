<template>
  <div id="container">
    <div class="swiper">
      <div class="swiper-wrapper" >
        <div class="swiper-slide" v-for="(banner,index) in bannerlist" :key="index">
          
        <img :src="banner.jqurl" class="swiper-img">
        <div class="text-overlay">
              <p>{{ banner.jqname }}</p>
              <p style="font-size: 20px; width: 500px;overflow: hidden; color: rgba(255,255,255,0.7);">{{ banner.jqcontent }}</p>
            </div>
      </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      
      <!-- 如果需要滚动条 -->
      <div class="swiper-scrollbar"></div>
    </div>
    <div class="content">
      <div class="info">
        <div class="info">
      <h1 style="text-align: center; border-bottom:1px solid #000;" >旅游信息公告</h1>
      <div class="infocontent">
        <a href="http://www.visitxm.com/news/1692061396373.html" target="blank">今起三天厦门天气不稳定 明后天雨势较大</a>
        <a href="http://www.visitxm.com/news/1692148509924.html" target="blank">马銮湾新城添一社区公园</a>
        <a href="http://www.visitxm.com/news/1692147525739.html" target="blank">厦门星级酒店推出滑梯套房</a>
        <a href="http://www.visitxm.com/news/1691977257373.html" target="blank">坐海上游船 体验特色玩法</a>
        <a href="http://www.visitxm.com/news/1561264563619.html" target="blank">厦门市情</a>
        <a href="http://www.visitxm.com/news/1691975746899.html" target="blank">濒危动物艺术馆落地厦门</a>
        <a href="http://www.visitxm.com/news/1691886731884.html" target="blank">杂技“大闹天宫” 还原经典场面</a>
        <a href="http://www.visitxm.com/news/1691886632784.html" target="blank">《闽南民居探秘》领略闽南建筑之美</a>
        <a href="http://www.visitxm.com/news/1691833841752.html" target="blank">“邂逅丙洲·‘蟹蟹’有你”渔村啤酒节将持续至15日</a>
        <a href="http://www.visitxm.com/news/1691833614569.html" target="blank">厦门白鹭体育场正式通过预验收</a>
        <a href="http://www.visitxm.com/news/1691629573057.html" target="blank">本周末来落日码头体验“鹭江奇妙夜”</a>
        <a href="http://www.visitxm.com/news/1691543130678.html" target="blank">今起到8月28日 登鼓浪屿 与文明同“邮”</a>
        <a href="http://www.visitxm.com/news/1691475150452.html" target="blank">十条措施促进文化和旅游消费！福建印发重要通知</a>
        <a href="http://www.visitxm.com/news/1691369962027.html" target="blank">“看见当代好设计”系列沙龙厦门站举行</a>
        <a href="http://www.visitxm.com/news/1690767877965.html" target="blank">“新思明”图片展 回顾20年变迁</a>
      </div>
      </div>  
    </div>
    <div class="forrouter">
    <div class="forrouter">
      <p>&nbsp;&nbsp;厦门，隶属于福建省，别称鹭岛， 简称厦、鹭， 副省级城市、经济特区，东南沿海重要的中心城市、港口及风景旅游城市。 厦门位于福建省东南端， 西界漳州， 北邻南安和晋江，东南与大小金门和大担岛隔海相望，通行闽南方言，是闽南地区的主要城市，与漳州、泉州并称厦漳泉闽南金三角经济区。</p>
      <p>&nbsp;&nbsp;2017年，厦门市常住人口401万人，全市户籍人口231.03万人。 2018年12月，被评为2018中国大陆最佳商业城市排名第22名，2018中国最佳旅游目的地城市第9名。</p>
    </div>
    </div>   
    </div>   
  </div>
</template>

<script>
import {defineComponent,} from 'vue'
import Swiper from 'swiper';
import 'swiper/css/swiper.css'
export default defineComponent({
  name: "mainpage",
  data(){
    return{
      bannerlist:{}
    }
  },
  mounted(){
    this.request.get('/jq').then(res=>{
      console.log(res);
      this.bannerlist=res.map(item=>{
        return item;
      })
      console.log(this.bannerlist);
    })
  },
  updated(){
   new Swiper(".swiper",{
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },  
    effect:'fade',
    autoplay:{
      delay:2000
    }
   })
  }
})
</script>
<style>
.swiper-pagination-bullet{
  background-color: #fff ;
  width: 15px !important;
    height: 15px !important;
}
</style>
<style scoped>
#container{
  width: 1000px;
  height: 100%;
  overflow: hidden;
}
.swiper {
    width: 1000px;
    height: 500px;
    position: relative;
}  
.swiper-button-prev { 
  position: absolute;
  color: rgba(255,255,255,0.5);
}
.swiper-button-prev:hover{
  color: rgb(252,85,49);
  
}
.swiper-button-next:hover{
  color: rgb(252,85,49);
}
.swiper-button-next{
  position: absolute;
  color: rgba(255,255,255,0.5);
} 
.swiper-scrollbar{
  display: none;
}
.swiper-img{
  width: 100%;
  height: 100%;;
}
.text-overlay {
  position: absolute; 
  top: 55px; 
  left: 20px;
  right: 0; 
  padding: 10px; 
  font-family: 微软雅黑;
  color: white;
  font-size: 75px
}
.content{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.info{
  width: 400px;
  height: 400px;
  background-color:rgba(47, 43, 43, 0.1);
  margin: 10px;
  border-radius: 10px;
  
}
.forrouter{
  width: 550px;
  height: 400px;
  background-color:rgba(47, 43, 43, 0.1);
  border-radius: 10px;
  margin: 10px;
  color: #000;
  font-size: 23px;
}
.infocontent{
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  
  height: 350px;
}
.infocontent a{
  text-decoration: none;
  font-size: 20px;
  color: #000;
}
.infocontent a:hover{
  color: aliceblue;
}
</style>