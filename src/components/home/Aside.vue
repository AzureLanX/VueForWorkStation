<template>
    <el-aside :width="isCollapse ? '64px' : '200px'" class="aside-container">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical"
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#ffffff"
        router
        :collapse="isCollapse"
      >
        <!-- 添加折叠按钮 -->
        <div class="toggle-button" @click="toggleCollapse">
          <el-icon><Fold /></el-icon>
        </div>
        
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
import { ref } from 'vue'
import { Position, MagicStick, VideoCameraFilled, DocumentAdd, Fold } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isCollapse = ref(false)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped>
.aside-container {
  transition: width 0.3s;
}

.el-aside {
    background-color: #409EFF;
}

.el-menu-vertical {
    border-right: none;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}

.toggle-button {
  color: #fff;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  padding: 10px 0;
}

.toggle-button:hover {
  background-color: #79bbff;
}

:deep(.el-menu-item.is-active) {
    background-color: #79bbff !important;
}

:deep(.el-menu-item:hover) {
    background-color: #79bbff !important;
    color: #ffffff !important;
}

.el-main {
    background-color: #f5f7fa;
}
</style>