<template>
  <div class="userinfo-container">
    <!-- 返回按钮 -->
    <div class="header">
      <el-button @click="goBack" type="text" class="back-button">
        <el-icon><ArrowLeft /></el-icon>
        返回主页
      </el-button>
    </div>

    <div class="main-content">
      <!-- 左侧头像区域 -->
      <div class="avatar-section">
        <div class="avatar-wrapper">
          <el-avatar 
            :size="120" 
            :src="userInfo.avatarUrl || '@/assets/user-avatar.png'"
            class="avatar"
          />
          <div class="avatar-mask" @click="handleAvatarClick">
            <el-icon><Camera /></el-icon>
            <span>更换头像</span>
          </div>
        </div>
        <input
          type="file"
          ref="fileInput"
          style="display: none"
          accept="image/*"
          @change="handleFileChange"
        />
      </div>

      <!-- 右侧信息区域 -->
      <div class="info-section">
        <h2>个人信息</h2>
        <el-form
          ref="formRef"
          :model="userInfo"
          label-width="100px"
          class="info-form"
        >
          <el-form-item label="用户名">
            <el-input 
              v-model="userInfo.account"
              disabled
              placeholder="请输入用户名"
            />
          </el-form-item>

          <el-form-item label="邮箱">
            <el-input 
              v-model="userInfo.email"
              disabled
              placeholder="请输入邮箱"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" disabled>编辑信息</el-button>
            <el-text type="info" size="small" class="edit-tip">
              暂不支持修改个人信息
            </el-text>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Camera } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getUserInfoService, userAvatarUpdateService} from '@/api/user.js'
import { uploadFileService } from '@/api/common.js'
import { useIdStore } from '@/stores/id.js'

const router = useRouter()
const idStore = useIdStore()
const fileInput = ref(null)
const formRef = ref(null)

// 用户信息
const userInfo = ref({
  account: '',
  email: '',
  avatarUrl: ''
})

// 获取用户信息
const getUserInfo = async () => {
  try {
    const res = await getUserInfoService(idStore.id)
    if (res.code === 1) {
      userInfo.value = res.data
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    ElMessage.error('获取用户信息失败')
  }
}

// 返回主页
const goBack = () => {
  router.push('/')
}

// 处理头像点击
const handleAvatarClick = () => {
  fileInput.value.click()
}

// 处理文件选择
const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 验证文件类型和大小
  if (!file.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件')
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过5MB')
    return
  }

  try {
    // 第一步：上传文件到阿里云OSS
    const formData = new FormData()
    formData.append('file', file)
    const uploadRes = await uploadFileService(formData)
    console.log('test1')
    if (uploadRes.code === 1) {
      // 获取到阿里云返回的URL
      const avatarUrl = uploadRes.data
      console.log(avatarUrl)
      // 第二步：更新用户头像URL
      const updateRes = await userAvatarUpdateService(avatarUrl)
      console.log('test2')
      if (updateRes.code === 1) {
        userInfo.value.avatarUrl = avatarUrl
        ElMessage.success('头像更新成功')
      } else {
        ElMessage.error('更新头像失败')
      }
    } else {
      ElMessage.error('上传图片失败')
    }
  } catch (error) {
    console.error('头像更新失败:', error)
    ElMessage.error('头像更新失败')
  } finally {
    // 清空文件输入框，允许重复选择同一文件
    event.target.value = ''
  }
}

onMounted(() => {
  getUserInfo()
})
</script>

<style scoped>
.userinfo-container {
  padding: 20px;
  height: 100%;
  background-color: #f5f7fa;
}

.header {
  margin-bottom: 30px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
}

.main-content {
  display: flex;
  gap: 50px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.avatar-section {
  padding: 20px;
}

.avatar-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.avatar {
  width: 100%;
  height: 100%;
}

.avatar-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar-wrapper:hover .avatar-mask {
  opacity: 1;
}

.avatar-mask .el-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.info-section {
  flex: 1;
  padding: 20px;
}

.info-section h2 {
  margin-bottom: 30px;
  color: #303133;
  font-size: 24px;
}

.info-form {
  max-width: 500px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
}

:deep(.el-input.is-disabled .el-input__wrapper) {
  background-color: #f5f7fa;
}

.edit-tip {
  margin-left: 10px;
  color: #909399;
}
</style>