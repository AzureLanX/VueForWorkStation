<template>
    <el-aside width="200px">
      <el-menu
        default-active="1"
        class="el-menu-vertical"
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#ffffff"
        router
      >
        <el-menu-item index="/systemResource">
          <el-icon><Position /></el-icon>
          <span>站点资源</span>
        </el-menu-item>
        <el-menu-item index="/ai">
          <el-icon><MagicStick /></el-icon>
          <span>智慧AI</span>
        </el-menu-item>
        <el-menu-item index="/blog">
          <el-icon><VideoCameraFilled /></el-icon>
          <span>个人博客</span>
        </el-menu-item>
        <el-menu-item index="/driver">
          <el-icon><DocumentAdd /></el-icon>
          <span>我的云盘</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
</template>
  
<script setup>
import { Position, MagicStick, VideoCameraFilled, DocumentAdd } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-aside {
    background-color: #409EFF;
}

.el-menu-vertical {
    border-right: none;
}
.el-main {
    background-color: #f5f7fa;
}
</style>