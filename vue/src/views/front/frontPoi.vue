<script>
import {defineComponent} from 'vue'


export default defineComponent({
  name: "MapdaoHang",
})
</script>

<template>
<div class="cover">
  <iframe src="/POI.html" class="ifr"></iframe>
</div>
</template>

<style scoped>
.cover{
  display: flex;
}
.ifr{
  width: 1000px;
  height: 750px;
}
</style>