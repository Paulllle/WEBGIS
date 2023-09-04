<template>
 <div style="min-height:100vh;">
   <el-container style="min-height: 100vh">
     <Aside/>
     <el-container>
       <el-header style="text-align: right; font-size: 12px;border-bottom: 1px solid #ccc;line-height: 60px">
      <Header/>
       </el-header>
       <el-main>
         <router-view />
       </el-main>
     </el-container>
   </el-container>
 </div>
</template>

<style>

</style>

<script>
// @ is an alias to /src
// import request from "@/utils/request";
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {



  components:{
    Aside,Header
  },
  
  }

</script>
