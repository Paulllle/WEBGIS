<script>
import Header from "@/components/fHeader.vue";
export default ({
  components:{
    Header
  },
})
</script>

<template>
 <div id="wrapper">
  <div s class="header">
    <Header/>
  </div>
  <div class="container">
   <router-view />
  </div>
 </div>
</template>

<style scoped>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.header{
  width: 100%;
  height: 10vh;
  
}
.container{
  background-color: #fff;
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-top:none ;
  border: 1px solid #ccc;
}
</style>