<template>
  <el-row :gutter="20" class="chart-row">
    <el-col :span="6" v-for="chart in charts" :key="chart.title">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>{{ chart.title }}</span>
          </div>
        </template>
        <div :id="chart.ref" class="chart"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const charts = [
  { title: 'CPU使用率', ref: 'cpuChart', color: '#409EFF', usage: ref(0) },
  { title: '内存使用率', ref: 'memoryChart', color: '#67C23A', usage: ref(0) },
  { title: '交换分区使用率', ref: 'swapChart', color: '#E6A23C', usage: ref(0) },
  { title: '硬盘使用率', ref: 'diskChart', color: '#F56C6C', usage: ref(0) }
]

let chartInstances = {}
let timer = null

const initChart = (chart) => {
  const chartDom = document.getElementById(chart.ref)
  if (!chartDom) return
  
  chartInstances[chart.ref] = echarts.init(chartDom)
  
  const option = {
    series: [{
      type: 'gauge',
      radius: '100%',
      startAngle: 90,
      endAngle: -270,
      pointer: { show: false },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          color: chart.color
        }
      },
      axisLine: {
        lineStyle: { width: 30 }
      },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      detail: {
        show: true,
        width: 80,
        height: 30,
        fontSize: 24,
        color: chart.color,
        offsetCenter: [0, 0],
        formatter: '{value}%',
        valueAnimation: true
      },
      data: [{
        value: chart.usage.value.toFixed(2),
      }]
    }]
  }
  
  chartInstances[chart.ref].setOption(option)
}

const updateChartData = () => {
  charts.forEach(chart => {
    chart.usage.value = Math.floor(Math.random() * 100)
    chartInstances[chart.ref]?.setOption({
      series: [{
        data: [{
          value: chart.usage.value.toFixed(2)
        }]
      }]
    })
  })
}

// 添加窗口大小变化监听
const handleResize = () => {
  Object.values(chartInstances).forEach(chart => {
    if (chart) {
      chart.resize()
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    charts.forEach(initChart)
    timer = setInterval(updateChartData, 1000)
    // 添加窗口大小变化监听
    window.addEventListener('resize', handleResize)
  }, 0)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  // 移除窗口大小变化监听
  window.removeEventListener('resize', handleResize)
  Object.values(chartInstances).forEach(chart => {
    if (chart) chart.dispose()
  })
})
</script>

<style scoped>
.chart-row {
  margin-top: 20px;
  height: calc(100% - 20px);
}

.chart {
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.el-card {
  height: 100%;
  margin-bottom: 20px;
}

.el-col {
  height: 100%;
}
</style>