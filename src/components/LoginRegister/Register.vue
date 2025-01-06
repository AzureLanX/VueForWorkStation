<template>
  <div class="register-container">
    <el-card class="register-box" :body-style="{ borderRadius: '16px' }">
      <h3 class="register-title">创建账号</h3>
      
      <el-form 
        ref="registerFormRef"
        :model="registerForm"
        :rules="rules"
        @submit.prevent="handleRegister"
        label-position="top"
        class="register-form"
      >
        <el-form-item prop="account">
          <span class="required-label">*</span>账号
          <el-input
            v-model="registerForm.account"
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

        <el-form-item prop="verificationCode">
          <span class="required-label">*</span>验证码
          <div class="verification-code-container">
            <el-input
              v-model="registerForm.verificationCode"
              placeholder="请输入验证码"
              class="verification-input"
            >
              <template #append>
                <el-button 
                  @click="sendVerificationCode" 
                  :disabled="isCodeSent"
                  class="verify-code-btn"
                  type="primary"
                  text
                >
                  {{ isCodeSent ? `${countdown}s后重试` : '获取验证码' }}
                </el-button>
              </template>
            </el-input>
          </div>
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
import { ElMessage } from 'element-plus';
import { userRegisterService, getRegisterVerificationCodeService } from '@/api/user.js';

// 定义要触发的事件
const emit = defineEmits(['switch-component']);

const registerForm = reactive({
  account: '',
  password: '',
  email: '',
  confirmPassword: '',
  verificationCode: ''
});

// 新增状态
const isCodeSent = ref(false);
const countdown = ref(60);

// 添加一个方法来获取要发送给后端的数据
const getRegisterData = () => {
  const { account, password, email ,verificationCode} = registerForm;
  return { account, password, email ,verificationCode};
};

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
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 20, message: '用户名长度应在6-20个字符之间', trigger: 'blur' }
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
  
  try {
    await registerFormRef.value.validate();
    // 只发送必要的数据给后端
    const registerData = getRegisterData();
    console.log(registerData);
    const res = await userRegisterService(registerData);
    console.log('注册成功:', res);
    ElMessage.success('注册成功');
    handleSwitch();
  } catch (err) {
    // 区分表单验证错误和接口调用错误
    if (err.fields) {
      console.log('表单验证失败:', err.fields);
    } else {
      console.error('注册失败:', err);
    }
  }
};

// 可以定义一个切换方法（可选）
const handleSwitch = () => {
    console.log('触发切换到登录');
    emit('switch-component');
};

// 发送验证码的方法
const sendVerificationCode = async () => {
  if (isCodeSent.value) return; // 如果验证码已发送，则不再发送

  // 先校验邮箱格式
  try {
    // 只校验email字段
    await registerFormRef.value.validateField('email');
    
    // 邮箱验证通过后，发送验证码
    await getRegisterVerificationCodeService(registerForm.email);
    ElMessage.success('验证码已发送，请查收邮箱');
    isCodeSent.value = true;

    // 开始倒计时
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
        isCodeSent.value = false;
        countdown.value = 60; // 重置倒计时
      }
    }, 1000);
  } catch (error) {
    // 如果是表单验证错误，不显示"发送验证码失败"的消息
    if (!error.fields) {
      ElMessage.error('发送验证码失败，请重试');
    }
  }
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
  height: 650px; /* 固定高度 */
  text-align: center;
  margin: 0 40px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
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

.verify-code-btn {
  height: 100%;
  min-width: 100px;
  padding: 0 20px;
  font-size: 13px;
  border-left: 1px solid var(--el-border-color-lighter);
  border-radius: 0;
  color: var(--el-color-primary);
  white-space: nowrap;
}

.verify-code-btn.is-disabled {
  color: var(--el-text-color-disabled);
  cursor: not-allowed;
}

.divider {
  width: 1px;
  height: 16px;
  background-color: var(--el-border-color);
  margin: 0;
}

/* 覆盖 Element Plus 的默认样式 */
:deep(.el-input-group__append) {
  padding: 0;
  background-color: var(--el-bg-color);
  min-width: 100px;
}

:deep(.el-input-group__append button.el-button) {
  border-radius: 0 8px 8px 0;
}

:deep(.el-input-group__append button.el-button:not(.is-disabled):hover) {
  background-color: var(--el-fill-color-light);
}

:deep(.el-input-group__append button.el-button[disabled]) {
  background-color: transparent;
  border: none;
}

/* 确保输入框圆角一致 */
:deep(.el-input__wrapper) {
  border-radius: 8px;
}

:deep(.el-input.is-focus .el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset;
}

.verification-input :deep(.el-input__wrapper) {
  padding-right: 0;  /* 移除右侧内边距 */
}

.verification-code-container {
  position: relative;
  width: 100%;
}

.verification-input {
  width: 100%;
}

.verification-input :deep(.el-input__wrapper) {
  border-radius: 8px;
}

.verify-code-btn {
  height: 100%;
  padding: 0 15px;
  font-size: 13px;
  border-left: 1px solid var(--el-border-color-lighter);
  border-radius: 0;
  color: var(--el-color-primary);
}

.verify-code-btn:hover:not(:disabled) {
  background-color: var(--el-color-primary-light-9);
}

.verify-code-btn:disabled {
  color: var(--el-text-color-disabled);
  cursor: not-allowed;
  background-color: transparent;
}

:deep(.el-input-group__append) {
  padding: 0;
  background-color: var(--el-bg-color);
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--el-border-color-hover) inset;
}

:deep(.el-input.is-focus .el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset;
}

/* 移除输入框的右边框圆角 */
.verification-input :deep(.el-input__wrapper) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

/* 添加按钮的右边框圆角 */
:deep(.el-input-group__append) {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow: hidden;
}
</style>
