<script>
import {defineComponent} from 'vue'
export default defineComponent({
  name: "Aboutus",
})
</script>

<template>
<div id="container">
  <h1 style="text-align: center;">项目名称:基于webgis的旅游综合查询系统——以厦门市为例</h1>
  <div id="content">
    <h2>小组成员及分工情况:</h2>
    <h3>组长:</h3>
    <p>郑觉谦--------前端:后台管理系统、登陆注册功能、旅游信息分享系统、后端搭建、网站部署上线</p>
    <h3>组员:</h3>
    <p>组员:韩琪--------旅游景区景点评价功能、城市数据查询功能</p>
    <p>组员:李文龙--------旅游景区路线导航功能、景区POI搜索功能</p>
    <p>组员:肖奥成--------近年台风信息功能</p>
    <h2>系统概述:</h2>
    该系统目标是：建立该系统，根据用户的不同需求，为用户景区路线提供直观的、可视化的参考;
    提供用户制定POI查询、路线规划的工具;
    分享近期台风信息，为用户出行计划提供参考;
    提供用户旅游信息分享平台，通过评分和其他用户的评论为用户做旅行参考。
  </div>
</div>
</template>

<style scoped>
#container{
  width: 100%;
  height: 800px;
  
}
#content{
  margin: 20px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
}
</style>