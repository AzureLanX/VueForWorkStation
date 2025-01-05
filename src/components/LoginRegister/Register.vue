<template>
  <div class="register-container">
    <el-card class="register-box" :body-style="{ borderRadius: '16px' }">
      <h3>创建账号</h3>
      
      <el-form 
        ref="registerFormRef"
        :model="registerForm"
        :rules="rules"
        @submit.prevent="handleRegister"
        label-position="top"
        class="register-form"
      >
        <el-form-item prop="username">
          <span class="required-label">*</span>账号
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <span class="required-label">*</span>密码
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码" 
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <span class="required-label">*</span>确认密码
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码" 
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="email">
          <span class="required-label">*</span>邮箱
          <el-input
            v-model="registerForm.email"
            placeholder="请输入邮箱"
            :prefix-icon="Message"
          />
        </el-form-item>

        <el-button type="primary" native-type="submit" class="register-button" style="border-radius: 8px;">
          注册
          <el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </el-form>
      
      <p class="login-link">
        <span class="login-text">已有账号？</span> 
        <el-link type="primary" class="login-link-btn" @click="handleSwitch">立即登录</el-link>
      </p>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { User, Lock, Message, ArrowRight } from '@element-plus/icons-vue';

// 定义要触发的事件
const emit = defineEmits(['switch-component']);

const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  email: ''
});

const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== registerForm.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3-20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在6-20个字符之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
};

const registerFormRef = ref(null);

const handleRegister = async () => {
  if (!registerFormRef.value) return;
  
  await registerFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('注册表单验证通过:', registerForm);
      // 处理注册逻辑
    } else {
      console.log('注册表单验证失败:', fields);
    }
  });
};

// 可以定义一个切换方法（可选）
const handleSwitch = () => {
    console.log('触发切换到登录');
    emit('switch-component');
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.register-box {
  width: 100%;
  max-width: 420px;
  height: 580px; /* 固定高度 */
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

.register-button {
  width: 100%;
  margin-top: 20px;
}

.login-link {
  margin-top: 20px;
  color: #666;
}

@media (max-width: 480px) {
  .register-box {
    margin: 0 20px;
  }
}

.register-form :deep(.el-form-item) {
  text-align: left;
  padding: 0 0px;
}

.register-form :deep(.el-input__wrapper) {
  padding-left: 8px;
  border-radius: 8px;
}

.register-form :deep(.el-input__prefix) {
  margin-right: 4px;
}

.required-label {
  color: #f56c6c;
  margin-right: 4px;
}
</style>
