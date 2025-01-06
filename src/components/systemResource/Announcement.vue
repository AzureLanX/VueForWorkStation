<template>
  <el-row :gutter="20">
    <!-- 左侧公告栏 -->
    <el-col :span="16">
      <el-card class="common-card">
        <template #header>
          <div class="card-header">
            <div class="title">
              <el-icon><Bell /></el-icon>
              <span>站点公告</span>
            </div>
            <el-button text>更多</el-button>
          </div>
        </template>
        
        <el-scrollbar height="230px">
          <div class="announcement-list">
            <div v-for="(item, index) in announcements" :key="index" class="announcement-item">
              <div class="announcement-title">
                <el-tag size="small" :type="item.type">{{ item.tag }}</el-tag>
                <span class="text">{{ item.title }}</span>
              </div>
              <div class="announcement-time">{{ item.time }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-card>
    </el-col>

    <!-- 右侧广告位 -->
    <el-col :span="8">
      <el-card class="common-card">
        <template #header>
          <div class="card-header">
            <div class="title">
              <el-icon><Promotion /></el-icon>
              <span>广告</span>
            </div>
          </div>
        </template>
        <el-scrollbar height="230px">
          <div class="ad-content">
            
          </div>
        </el-scrollbar>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { Bell, Promotion } from '@element-plus/icons-vue'

const announcements = ref([
  {
    title: '站点维护通知：系统将于本周六凌晨2点进行例行维护',
    time: '2024-03-20',
    tag: '维护',
    type: 'warning'
  },
  {
    title: '新功能上线：AI智能助手功能正式发布',
    time: '2024-03-19',
    tag: '更新',
    type: 'success'
  },
  {
    title: '安全提醒：请及时修改您的密码',
    time: '2024-03-18',
    tag: '安全',
    type: 'danger'
  },
  {
    title: '用户调查：参与问卷调查赢取精美礼品',
    time: '2024-03-17',
    tag: '活动',
    type: 'info'
  },
  {
    title: '性能优化：系统响应速度提升30%',
    time: '2024-03-16',
    tag: '优化',
    type: 'success'
  }
])
</script>

<style scoped>
.common-card {
  height: 350px;
  margin: 20px 0 0 0;  /* 添加上下边距 */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.announcement-list {
  padding: 0 10px;
}

.announcement-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #ebeef5;
}

.announcement-item:last-child {
  border-bottom: none;
}

.announcement-title {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.text {
  color: #303133;
}

.announcement-time {
  color: #909399;
  font-size: 13px;
}

.el-tag {
  width: 45px;
  text-align: center;
}

.ad-content {
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-image {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-scrollbar {
  height: 100%;
}
</style>