<template>
  <div class="chat-container">
    <!-- 聊天记录区域 -->
    <div class="chat-messages" ref="messageContainer">
      <div v-for="(message, index) in messages" :key="index" 
           :class="['message', message.role === 'user' ? 'user-message' : 'ai-message']">
        <div class="message-content">
          <el-avatar v-if="message.role === 'ai'" :size="40" :icon="Service" class="avatar-left" />
          <el-avatar v-if="message.role === 'user'" :size="40" :icon="UserFilled" class="avatar-right" />
          <div class="text-content" v-if="message.role === 'user'">{{ message.content }}</div>
          <div class="text-content markdown-body" v-else v-html="renderMarkdown(message.content)"></div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <el-input
        v-model="inputMessage"
        type="textarea"
        :rows="3"
        placeholder="请输入您的问题..."
        resize="none"
        @keyup.enter.ctrl="sendMessage"
      />
      <div class="button-area">
        <span class="tip">Ctrl + Enter 发送</span>
        <el-button type="primary" @click="sendMessage" :loading="loading">
          发送
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { UserFilled, Service } from '@element-plus/icons-vue'
import { getAIResponse } from '@/utils/KimiAI.js'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // 选择一个你喜欢的主题
import DOMPurify from 'dompurify'

// 初始化 markdown-it
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // 使用默认的转义
  }
})

// 添加 markdown 渲染函数
const renderMarkdown = (content) => {
  const html = md.render(content)
  return DOMPurify.sanitize(html)
}

const messages = ref([
  { role: 'ai', content: '你好！我是AI助手，有什么可以帮助你的吗？' }
])
const inputMessage = ref('')
const loading = ref(false)
const messageContainer = ref(null)

// 滚动到底部函数
const scrollToBottom = async () => {
  await nextTick()
  messageContainer.value.scrollTop = messageContainer.value.scrollHeight
}
// 发送消息
const sendMessage = async () => {
  if (!inputMessage.value.trim() || loading.value) return
  
  // 添加用户消息
  messages.value.push({ role: 'user', content: inputMessage.value.trim() })
  await scrollToBottom()
  
  // 清空输入框
  const userMessage = inputMessage.value
  inputMessage.value = ''
  
  // 设置加载状态
  loading.value = true
  
  // 添加一个空的 AI 消息
  messages.value.push({ role: 'ai', content: '' })

  try {
    // 使用回调函数更新消息内容
    await getAIResponse(userMessage, (content) => {
      messages.value[messages.value.length - 1].content = content
      scrollToBottom()
    })
  } catch (error) {
    console.error('AI响应错误:', error)
    messages.value[messages.value.length - 1].content = '抱歉，发生了错误，请稍后重试。'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.chat-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message {
  margin-bottom: 20px;
}

.message-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 0 10px;
}

.user-message .message-content {
  flex-direction: row-reverse;
}

.text-content {
  padding: 12px 16px;
  border-radius: 8px;
  max-width: 80%;
  word-break: break-word;
  line-height: 1.5;
}

.user-message .text-content {
  background-color: #ecf5ff;
  color: #409EFF;
  margin-left: auto;
}

.ai-message .text-content {
  background-color: #f4f4f5;
  color: #303133;
  margin-right: auto;
}

.avatar-left {
  margin-right: 8px;
}

.avatar-right {
  margin-left: 8px;
}

.input-area {
  padding: 20px;
  border-top: 1px solid #ebeef5;
}

.button-area {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tip {
  color: #909399;
  font-size: 12px;
}

:deep(.el-textarea__inner) {
  resize: none;
}

/* 添加 markdown 样式 */
.markdown-body {
  font-size: 14px;
}

.markdown-body :deep(pre) {
  background-color: #f6f8fa;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
}

.markdown-body :deep(code) {
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  background-color: rgba(175, 184, 193, 0.2);
  padding: 0.2em 0.4em;
  border-radius: 6px;
  font-size: 85%;
}

.markdown-body :deep(p) {
  margin: 8px 0;
}

.markdown-body :deep(ul), 
.markdown-body :deep(ol) {
  padding-left: 20px;
}

.markdown-body :deep(table) {
  border-collapse: collapse;
  margin: 12px 0;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid #d0d7de;
  padding: 6px 13px;
}

.markdown-body :deep(blockquote) {
  color: #666;
  margin: 0;
  padding-left: 12px;
  border-left: 4px solid #ddd;
}
</style>