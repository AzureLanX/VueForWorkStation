<template>
  <el-container class="layout-container">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="header-left">
        <span class="system-title">学生成绩管理系统</span>
      </div>
      <div class="header-right">
        <el-dropdown>
          <span class="user-info">
            管理员 <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="side-menu"
          :router="true"
        >
          <el-menu-item index="1">
            <el-icon><DataLine /></el-icon>
            <span>成绩总览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><User /></el-icon>
            <span>学生管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Edit /></el-icon>
            <span>成绩录入</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Document /></el-icon>
            <span>成绩查询</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主要内容区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { CaretBottom, DataLine, User, Edit, Document } from '@element-plus/icons-vue'
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.header {
  background-color: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.system-title {
  font-size: 20px;
  font-weight: bold;
}

.user-info {
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.side-menu {
  height: 100%;
  border-right: none;
}

.el-aside {
  background-color: #f5f7fa;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>