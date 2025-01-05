<template>
    <div class="login-page">
        <!-- 左侧介绍区域 -->
        <div class="left-section">
            <div class="intro-content">
                <img src="@/assets/logo.png" alt="Logo" class="logo">
                <h1 class="title">开箱即用</h1>
                <p class="description">快速与便捷的开发，希望使用愉快～</p>
                <img src="@/assets/login-illustration.png" alt="Illustration" class="illustration">
            </div>
        </div>
        
        <!-- 右侧登录/注册区域 -->
        <div class="right-section">
            <transition name="slide" mode="out-in">
                <component 
                    :is="currentComponent" 
                    @switch-component="switchComponent"
                    class="auth-component"
                />
            </transition>
        </div>
    </div>
</template>

<script setup>
import { shallowRef } from 'vue';
import Login from '@/components/LoginRegister/Login.vue';
import Register from '@/components/LoginRegister/Register.vue';

const currentComponent = shallowRef(Login);

const switchComponent = () => {
    console.log('切换组件');
    currentComponent.value = currentComponent.value === Login ? Register : Login;
};
</script>

<style scoped>
.login-page {
    display: flex;
    width: 100%;
    height: 98.3vh;
}

.left-section {
    flex: 1;
    background-color: #e9ebf7;
    display: flex;
    align-items: center;
    justify-content: center;
}

.right-section {
    flex: 2;
    background-color: #f7f7f7;
    display: flex;
    align-items: center;
    justify-content: center;
}

.auth-component {
    width: 100%;
    height: 100%;
}

.intro-content {
    max-width: 520px;
    text-align: center;
}

.logo {
    width: 48px;
    height: 48px;
    margin-bottom: 24px;
}

.title {
    font-size: 28px;
    color: #1a1a1a;
    margin-bottom: 16px;
}

.description {
    font-size: 16px;
    color: #666;
    margin-bottom: 40px;
}

.illustration {
    width: 100%;
    max-width: 400px;
    height: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .login-page {
        flex-direction: column;
    }

    .left-section {
        padding: 20px;
    }

    .illustration {
        max-width: 300px;
    }
}

/* 滑动动画 */
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from {
    opacity: 0;
    transform: translateX(50px);
}

.slide-leave-to {
    opacity: 0;
    transform: translateX(-50px);
}

.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    transform: translateX(0);
}
</style>