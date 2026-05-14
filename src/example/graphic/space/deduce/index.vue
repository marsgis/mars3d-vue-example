<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-space>
      <mars-button v-if="isPlay" @click="stopPlay">停止推演</mars-button>
      <mars-button class="start-btn" v-else @click="startPlay">开始推演</mars-button>
      <mars-button v-if="isPlay" @click="pausePlay">{{ isPause ? "继续" : "暂停" }}</mars-button>
    </a-space>

    <mars-tree class="f-mb f-pt" :tree-data="treeNodes" v-model:selectedKeys="selectedKeys" :defaultExpandAll="true"
      :selectable="true">
      <template #title="{ title, key }">
        <span class="runing-item" v-if="key === selectKey" type="link">{{ title }} </span>
        <span v-else>{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import * as mapWork from "./map.js"
import { $message } from "@mars/components/mars-ui/index"

const selectedKeys = ref<any[]>([])
const isPlay = ref(false)
const isPause = ref(false)

const treeNodes: any[] = [
  {
    title: "卫星推演",
    key: 1,
    children: [
      {
        title: "初始化场景",
        key: "01-01",
        message: "正在初始化推演场景",
        times: 2,
        widget() {
          mapWork.initScene()
        }
      },
      {
        title: "需求受理",
        key: "01-02",
        times: 8,
        message: "中国资源卫星应用中心接收到需求，开始受理需求",
        widget() {
          mapWork.acceptance()
        }
      },
      {
        title: "任务编排",
        key: "01-03",
        times: 7,
        message: "中国资源卫星应用中心正在对任务进行编排",
        widget() {
          mapWork.task()
        }
      },
      {
        title: "任务上注",
        key: "01-04",
        times: 10,
        message: "中国资源卫星应用中心正在对任务进行上注处理",
        widget() {
          mapWork.startTask()
        }
      },
      {
        title: "卫星观测",
        key: "01-05",
        message: "通过卫星观测,返回观测数据",
        times: 15,
        widget() {
          mapWork.satelliteLook()
        }
      },
      {
        title: "数据接收",
        key: "01-06",
        times: 10,
        message: "接收到卫星返回的观测数据",
        widget() {
          mapWork.sendDataAction()
        }
      },
      {
        title: "数据传输",
        key: "01-07",
        message: "开始传输数据",
        times: 10,
        widget() {
          mapWork.transferringData()
        }
      },
      {
        title: "产品生产",
        key: "01-08",
        message: "开始生产产品",
        times: 5,
        widget() {
          mapWork.production()
        }
      },
      {
        title: "产品分发",
        key: "01-09",
        message: "对产品进行分发",
        times: 5,
        widget() {
          mapWork.distribution()
        }
      }
    ]
  }
]

let animations: any[] = []
let currentIndex = 0
let timer = null // 定时器
onMounted(() => {
  let i = 0
  let time = 0
  treeNodes.forEach((item) => {
    animations = animations.concat(
      item.children.map((it: any) => {
        time += it.times
        it.index = i
        i++
        return it
      })
    )
  })
})

// 开始推演
let stopTimer = null
const selectKey = ref()
const startPlay = async () => {
  isPlay.value = true
  if (timer) {
    clearTimeout(timer) // 清除定时器
  }

  if (currentIndex < animations.length) {
    const animate = animations[currentIndex]
    selectKey.value = animate.key
    selectedKeys.value = [animate.key]
    await animate.widget() // 执行map.js中的方法
    $message(animate.message)
    currentIndex++
    timer = setTimeout(() => {
      startPlay()
    }, animate.times * 1000)

    if (currentIndex === 9) {
      stopTimer = setTimeout(() => {
        stopPlay()
      }, 10000)
    }
  }
}

const stopPlay = () => {
  isPlay.value = false
  isPause.value = false

  mapWork.clearAll()
  clearTimeout(timer)
  clearTimeout(stopTimer)
  selectKey.value = null
  currentIndex = 0
}

const pausePlay = () => {
  isPause.value = !isPause.value
  if (isPause.value) {
    clearTimeout(timer)
    clearTimeout(stopTimer)
  } else {
    startPlay()
  }
}
</script>
<style lang="less" scoped>
.runing-item {
  background: var(--mars-list-active);
}

:deep(.ant-tree) {
  .ant-tree-treenode {
    width: 100% !important;
  }
}

:deep(.ant-tree-treenode) {
  width: 100% !important;
}

.mars-button {
  width: 146px;
}

.start-btn {
  width: 300px;
}
</style>
