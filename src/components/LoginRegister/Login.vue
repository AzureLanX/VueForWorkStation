<template>
  <div class="login-container">
    <el-card class="login-box" :body-style="{ borderRadius: '16px' }">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="Logo" class="logo" style="border-radius: 50%;">
      </div>
      <h3>欢迎回来</h3>
      
      <el-form 
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        @submit.prevent="handleLogin"
        label-position="top"
        class="login-form"
      >
        <el-form-item prop="account">
          <span class="required-label">*</span>账号
          <el-input
            v-model="loginForm.account"
            placeholder="请输入用户名"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <span class="required-label">*</span>密码
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码" 
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <div class="options-row">
          <el-link type="primary">忘记密码？</el-link>
        </div>

        <el-button type="primary" native-type="submit" class="login-button" style="border-radius: 8px;">
          登录
          <el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </el-form>
      
      <p class="register-link">
        <span class="register-text">还没有账号？</span> 
        <el-link type="primary" class="register-link-btn" @click="handleSwitch">立即注册</el-link>
      </p>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { User, Lock, ArrowRight } from '@element-plus/icons-vue';
import { userLoginService } from '@/api/user.js';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useTokenStore } from '@/stores/token.js';
const tokenStore = useTokenStore();
const router = useRouter();

// 定义要触发的事件
const emit = defineEmits(['switch-component']);

const loginForm = reactive({
  account: '',
  password: ''
});

const rules = {
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3-20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在6-20个字符之间', trigger: 'blur' }
  ]
};

const loginFormRef = ref(null);

const handleLogin = async () => {
  if (!loginFormRef.value) return;
  
  try {
    await loginFormRef.value.validate();
    const res = await userLoginService(loginForm);
    console.log('登录成功:', res);
    ElMessage.success('登录成功');
    // 保存 token
    tokenStore.setToken(res.data.token);
    // TODO: 登录成功后的路由跳转
    router.push('/');
  } catch (err) {
    // 区分表单验证错误和接口调用错误
    if (err.fields) {
      console.log('表单验证失败:', err.fields);
    } else {
      console.error('登录失败:', err);
    }
  }
};

// 可以定义一个切换方法（可选）
const handleSwitch = () => {
    console.log('触发切换到注册');
    emit('switch-component');
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.login-box {
  width: 100%;
  max-width: 420px;
  height: 650px; /* 固定高度 */
  text-align: center;
  margin: 0 40px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  box-sizing: border-box;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 80px;
  height: auto;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
}

.options-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 15px 0;
}

.login-button {
  width: 100%;
  margin-top: 20px;
}

.register-link {
  margin-top: 20px;
  color: #666;
}

@media (max-width: 480px) {
  .login-box {
    margin: 0 20px;
  }
}

.login-form :deep(.el-form-item) {
  text-align: left;
  padding: 0 0px;
}

.login-form :deep(.el-input__wrapper) {
  padding-left: 8px;
  border-radius: 8px;
}

.login-form :deep(.el-input__prefix) {
  margin-right: 4px;
}

.required-label {
  color: #f56c6c;
  margin-right: 4px;
}
</style>
