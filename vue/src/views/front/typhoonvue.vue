<script>
import {defineComponent} from 'vue'


export default defineComponent({
  name: "Typhoon",
})
</script>

<template>
<div class="cover">
  <iframe src="/typhoon.html" class="ifr"></iframe>
</div>
</template>

<style scoped>
.cover{
  display: flex;
  width: 100%;
  height: 85vh;
}
.ifr{
  width: 100%;
  height: 100%;
}
</style>