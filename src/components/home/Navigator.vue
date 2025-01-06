<template>
    <el-header>
      <div class="header-left">
        <el-button plain>
          <el-icon><Fold /></el-icon>
        </el-button>
        <span class="title">工作台</span>
      </div>
      <div class="header-right">
        <el-dropdown>
          <span class="el-dropdown-link">
            admin<el-icon class="el-icon--right"><ArrowDown /></el-icon>
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
  </template>
  
  <script setup>
  import { Fold, ArrowDown } from '@element-plus/icons-vue'
  </script>
  
  <style scoped>
  .el-header {
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .header-right {
    cursor: pointer;
    color: #409EFF;
  }
  
  .title {
    font-size: 18px;
    font-weight: bold;
    color: #409EFF;
  }
  </style>