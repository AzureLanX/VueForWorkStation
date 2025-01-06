<template>
    <el-header>
      <div class="header-left">
        <img src="/工作台.svg" alt="网站Logo" class="logo" />
        <span class="title">智慧工作站</span>
      </div>
      <div class="header-center">
        <el-dropdown>
          <span class="el-dropdown-link">选项1</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>选项1-1</el-dropdown-item>
              <el-dropdown-item>选项1-2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">选项2</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>选项2-1</el-dropdown-item>
              <el-dropdown-item>选项2-2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">选项3</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>选项3-1</el-dropdown-item>
              <el-dropdown-item>选项3-2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="header-right">
        <el-avatar size="40" src="@/assets/user-avatar.png" />
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
    margin-left: -5px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .header-center {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .header-right {
    margin-right: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #409EFF;
  }
  
  .title {
    margin-left: 12px;
    font-size: 22px;
    font-weight: bold;
    color: #409EFF;
  }
  
  .logo {
    height: 40px;
  }
  </style>