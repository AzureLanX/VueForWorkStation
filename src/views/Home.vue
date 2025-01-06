<template>
  <el-container class="layout-container">
    <Navigator />
    <el-container class="main-container">
        <Aside />
    </el-container>
  </el-container>
</template>

<script setup>
import Navigator from '@/components/home/Navigator.vue'
import Aside from '@/components/home/Aside.vue'
</script>

<style scoped>
.layout-container {
  height: 98vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  flex: 1;
  overflow: hidden;
}
</style>