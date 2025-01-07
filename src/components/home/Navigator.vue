<template>
  <el-header>
    <div class="left-section">
      <div class="header-left">
        <img src="/工作台.svg" alt="网站Logo" class="logo" />
        <span class="title">智慧工作站</span>
      </div>
      <div class="header-menu">
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">选项1</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>选项1-1</el-dropdown-item>
              <el-dropdown-item>选项1-2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">选项2</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>选项2-1</el-dropdown-item>
              <el-dropdown-item>选项2-2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        
      </div>
    </div>

    <!-- 通知栏 -->
    <div class="notification-bar" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
      <el-icon class="notification-icon"><Bell /></el-icon>
      <div class="notification-content">
        <div class="notification-wrapper" :style="{ transform: `translateY(${-currentIndex * 40}px)` }">
          <div v-for="notice in notifications" :key="notice.id" class="notification-item">
            {{ notice.content }}
          </div>
        </div>
      </div>
    </div>

    <div class="header-right" @click="drawerVisible = true">
      <el-avatar 
        size="50" 
        :src="userInfo.avatarUrl || '@/assets/user-avatar.png'"
        class="avatar-button"
      />
      <span class="username">{{ userInfo.account }}</span>
    </div>

    <user-drawer 
      v-model="drawerVisible"
      :user-info="userInfo"
    />
  </el-header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue'
import { Fold, ArrowDown, Bell } from '@element-plus/icons-vue'
import userDrawer from '@/components/home/UserDrawer.vue'
import { getUserInfoService } from '@/api/user.js'
import { useIdStore } from '@/stores/id.js'
import { ElMessage } from 'element-plus'

const drawerVisible = ref(false)
const scrollInterval = ref(null)
const idStore = useIdStore()

// 用户信息
const userInfo = ref({
  id: '',
  account: '用户名',
  email: 'example@email.com',
  avatarUrl: ''
})

// 获取用户信息
const getUserInfo = async () => {
  try {
    const res = await getUserInfoService(idStore.id)
    if (res.code === 1) {
      console.log("获取用户信息成功",res.data)
      userInfo.value = res.data
    } else {
      // ElMessage.error('获取用户信息失败')
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    // ElMessage.error('获取用户信息失败')
  }
}

// 在组件挂载前获取用户信息
onBeforeMount(async () => {
  await getUserInfo()
})

// 通知数据
const notifications = ref([
  { id: 1, content: '欢迎使用智慧工作站系统！' },
  { id: 2, content: '系统将于今晚22:00进行例行维护。' },
  { id: 3, content: '新功能上线公告：AI助手功能已经上线。' },
])

const currentIndex = ref(0)
const isPaused = ref(false)

// 开始滚动
const startScroll = () => {
  stopScroll()
  scrollInterval.value = setInterval(() => {
    if (!isPaused.value) {
      currentIndex.value = (currentIndex.value + 1) % notifications.value.length
    }
  }, 3000)
}

// 停止滚动
const stopScroll = () => {
  if (scrollInterval.value) {
    clearInterval(scrollInterval.value)
  }
}

// 暂停滚动
const pauseScroll = () => {
  isPaused.value = true
}

// 恢复滚动
const resumeScroll = () => {
  isPaused.value = false
}

onMounted(() => {
  startScroll()
})

onUnmounted(() => {
  stopScroll()
})
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

.left-section {
  display: flex;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  margin-right: 40px;
}

.header-menu {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 通知栏样式 */
.notification-bar {
  flex: 1;
  max-width: 550px;
  margin: 0 40px;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 20px;
  padding: 0 20px;
  overflow: hidden;
}

.notification-icon {
  color: #409EFF;
  margin-right: 10px;
  font-size: 18px;
}

.notification-content {
  flex: 1;
  height: 40px;
  overflow: hidden;
  position: relative;
}

.notification-wrapper {
  transition: transform 0.5s ease-in-out;
}

.notification-item {
  height: 40px;
  line-height: 40px;
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 鼠标悬停时的效果 */
.notification-bar:hover {
  background-color: #eef1f6;
}

.notification-bar:hover .notification-icon {
  animation: bell-shake 0.5s ease;
}

@keyframes bell-shake {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
}

.header-right {
  margin-right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 8px;
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

.avatar-button {
  transition: transform 0.2s;
}

.header-right:hover .avatar-button {
  transform: scale(1.05);
}

/* 下拉框样式 */
.dropdown {
  position: relative;
}

.dropdown .el-dropdown-link {
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.dropdown .el-dropdown-link:hover {
  background-color: #f5f7fa;
}

/* 用户名样式 */
.username {
  margin-left: 10px;
  font-size: 16px;
  color: #333;
}
</style>