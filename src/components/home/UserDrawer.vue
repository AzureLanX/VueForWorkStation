<template>
  <el-drawer
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    title="个人中心"
    direction="rtl"
    size="300px"
    :with-header="false"
    class="user-drawer"
  >
    <div class="drawer-content">
      <!-- 添加关闭按钮 -->
      <div class="close-button">
        <el-button
          type="text"
          @click="emit('update:modelValue', false)"
          class="close-icon-button"
        >
          <el-icon :size="20"><Close /></el-icon>
        </el-button>
      </div>

      <div class="drawer-main">
        <!-- 用户信息区域 -->
        <div class="user-info">
          <el-avatar 
            size="64" 
            :src="userInfo.avatarUrl || '@/assets/user-avatar.png'"
          />
          <h3 class="username">{{ userInfo.account }}</h3>
          <p class="email">{{ userInfo.email }}</p>
        </div>

        <!-- 分割线 -->
        <el-divider />

        <!-- 菜单列表 -->
        <div class="menu-list">
          <div class="menu-item" @click="handleMenuClick('profile')">
            <el-icon><User /></el-icon>
            <span>个人资料</span>
          </div>
          <div class="menu-item" @click="handleMenuClick('settings')">
            <el-icon><Setting /></el-icon>
            <span>账号设置</span>
          </div>
          <div class="menu-item" @click="handleMenuClick('help')">
            <el-icon><QuestionFilled /></el-icon>
            <span>帮助中心</span>
          </div>
        </div>
      </div>

      <!-- 底部退出按钮 -->
      <div class="logout-section">
        <el-divider />
        <el-button type="danger" plain @click="handleLogout" class="logout-button">
          <el-icon><SwitchButton /></el-icon>
          退出登录
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { 
  User, 
  Setting, 
  QuestionFilled, 
  SwitchButton,
  Close  // 添加 Close 图标
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userInfo: {
    type: Object,
    required: true,
    default: () => ({
      account: '',
      email: '',
      avatarUrl: ''
    })
  }
})

// 定义emit
const emit = defineEmits(['update:modelValue'])

// 处理菜单点击
const handleMenuClick = (type) => {
  switch(type) {
    case 'profile':
      // 跳转到个人资料页
      break
    case 'settings':
      // 跳转到设置页
      break
    case 'help':
      // 跳转到帮助中心
      break
  }
  emit('update:modelValue', false)
}

// 处理退出登录
const handleLogout = () => {
  // 实现退出登录逻辑
  emit('update:modelValue', false)
  router.push('/login')
}
</script>

<style scoped>
.drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 40px;
}

.drawer-main {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
}

/* 关闭按钮样式 */
.close-button {
  position: absolute;
  top: 0; /* 紧贴上边框 */
  left: 0; /* 紧贴左边框 */
  z-index: 1;
}

.close-icon-button {
  padding: 8px;
  color: #909399;
  transition: color 0.3s;
}

.close-icon-button:hover {
  color: #409EFF;
}

/* 用户信息样式 */
.user-info {
  text-align: center;
  padding: 20px 0;
}

.username {
  margin: 10px 0 5px;
  font-size: 18px;
  font-weight: 600;
}

.email {
  color: #666;
  font-size: 14px;
  margin: 0;
}

/* 菜单列表样式 */
.menu-list {
  padding: 10px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin: 4px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: var(--el-color-primary-light-9);
}

.menu-item .el-icon {
  margin-right: 12px;
  font-size: 18px;
}

/* 退出登录区域样式 */
.logout-section {
  padding: 0 20px 20px;
  margin-top: auto;
}

.logout-button {
  width: 100%;
  margin-top: 12px;
}

/* 自定义抽屉样式 */
:deep(.el-drawer__body) {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.el-icon {
  vertical-align: middle;
}

.menu-item span {
  vertical-align: middle;
}

:deep(.el-divider--horizontal) {
  margin: 16px 0;
}
</style> 