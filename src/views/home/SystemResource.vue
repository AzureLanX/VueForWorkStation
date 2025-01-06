<template>
  <div class="system-resource">
    <!-- 数据概览卡片 -->
    <WebData />
    <!-- 公告 -->
    <Announcement />
    <!-- 系统资源监控图表 -->
    <SystemData />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import WebData from '@/components/systemResource/WebData.vue'
import SystemData from '@/components/systemResource/SystemData.vue'
import Announcement from '@/components/systemResource/Announcement.vue';
</script>