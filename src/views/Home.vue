<template>
    我是首页
</template>

<script setup>
import { onMounted } from 'vue'
import { userTestService } from '@/api/user';
onMounted(() => {
    console.log('组件已挂载，可以在这里写你的函数');
    // 这里可以写你要执行的函数
    userTestService().then(res => {
        console.log('测试接口返回:', res);
    });
});
</script>

<style scoped>

</style>