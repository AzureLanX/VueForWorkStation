<template>
  <el-row :gutter="20" class="chart-row">
    <el-col :span="6" v-for="(item, index) in dataItems" :key="index">
      <el-card shadow="hover">
        <div class="data-item">
          <div class="data-icon">
            <el-icon><component :is="item.icon" /></el-icon>
          </div>
          <div class="data-info">
            <div class="data-title">{{ item.title }}</div>
            <div class="data-number">{{ item.value }}</div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { User, View, UserFilled, Monitor } from '@element-plus/icons-vue'

const dataItems = ref([
  { title: '累计访问', value: 12345, icon: User },
  { title: '今日访问', value: 123, icon: View },
  { title: '注册用户', value: 456, icon: UserFilled },
  { title: '系统运行时间', value: '30天', icon: Monitor }
])
</script>

<style scoped>
.chart-row {
  margin-top: -10px;
}
.data-item {
  display: flex;
  align-items: center;
}

.data-icon {
  font-size: 48px;
  color: #409EFF;
  margin-right: 20px;
}

.data-info {
  flex: 1;
}

.data-title {
  font-size: 14px;
  color: #909399;
}

.data-number {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-top: 5px;
}
</style>