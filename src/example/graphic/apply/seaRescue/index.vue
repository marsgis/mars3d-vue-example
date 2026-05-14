<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-space>
      <mars-button class="btn-mb" :class="isPause ? 'btn-pause' : 'btn-play'" v-if="!isPlay || isPause" @click="play">
        <a-space>
          <mars-icon icon="handle-triangle" class="icon-vertical-a" />
          <span>{{ isPause ? "继续" : "开始" }}</span>
        </a-space>
      </mars-button>
      <mars-button class="btn-mb" v-if="isPlay && !isPause" @click="pause">
        <a-space>
          <mars-icon icon="pause-one" class="icon-vertical-a" />
          <span>暂停</span>
        </a-space>
      </mars-button>
      <mars-button class="btn-mb" v-if="isPlay" @click="stop">
        <a-space>
          <mars-icon icon="power" class="icon-vertical-a" />
          <span>停止</span>
        </a-space>
      </mars-button>
    </a-space>

    <mars-tree class="f-mb" :tree-data="treeData" v-model:selectedKeys="selectedKeys" :defaultExpandAll="true"
      :selectable="true">
      <template #title="{ title, isLeaf, dataRef }">
        <span @click="startBegin(dataRef)" v-if="isLeaf" type="link">{{ title }}({{ dataRef.times }}秒)</span>
        <span v-else>{{ title }}</span>
      </template>
    </mars-tree>
    <template v-if="isPlay && counter !== 0">
      <h3 class="f-mb show-time">总时长：{{ totalTimes }}</h3>
      <h3 class="f-mb show-time">当前: {{ currentWork }}&nbsp;{{ counter }}秒</h3>
    </template>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import * as mapWork from "./map.js"
const isPlay = ref(false)
const isPause = ref(false)
const totalTimes = ref("")
const selectedKeys = ref<any[]>([])
const counter = ref(0)
const currentIndex = ref(0)
let timer: any = null
let interval: any = null
const animations: any[] = []
const currentWork = ref("")

onMounted(() => {
  let i = 0
  let time = 0
  treeData.forEach((item) => {
    const animationItem = item
    animationItem.index = i
    time += item.times
    i++
    animations.push(animationItem)
  })
  mapWork.addGraphics()
  totalTimes.value = `${Math.floor(time / 60)}分${time % 60}秒`
})

function play() {
  isPlay.value = true
  isPause.value = false
  start()
}
function pause() {
  if (timer) {
    clearTimeout(timer)
  }
  if (interval) {
    clearInterval(interval)
  }
  counter.value = 0

  currentIndex.value--
  isPause.value = true
}

function stop() {
  isPlay.value = false
  isPause.value = false

  if (timer) {
    clearTimeout(timer)
  }
  if (interval) {
    clearInterval(interval)
  }

  counter.value = 0
  currentIndex.value = 0
  timer = null
  interval = null
  currentWork.value = ""
  mapWork.stop()
}

const startBegin = (item: any) => {
  currentIndex.value = item.index
  play()
}

const start = () => {
  if (timer) {
    clearTimeout(timer)
  }
  if (interval) {
    clearInterval(interval)
  }

  if (currentIndex.value < animations.length) {
    const animate = animations[currentIndex.value]
    selectedKeys.value = [animate.key]
    currentWork.value = `${animate.title}(${animate.times}秒)`
    counter.value = animate.times
    countOn()
    animate.widget()
    currentIndex.value++
    timer = setTimeout(() => {
      start()
    }, animate.times * 1000)
  } else {
    stop()
  }
}

const treeData: any[] = [
  {
    title: "发送信号",
    key: "01",
    times: 5,
    widget() {
      mapWork.firstStep()
    }
  },
  {
    title: "传送信号",
    key: "02",
    times: 5,
    widget() {
      mapWork.secondStep()
    }
  },
  {
    title: "下达指令",
    key: "03",
    times: 5,
    widget() {
      mapWork.thirdStep()
    }
  },
  {
    title: "准备出发",
    key: "04",
    times: 5,
    widget() {
      mapWork.forthStep()
    }
  },
  {
    title: "出发",
    key: "05",
    times: 7,
    widget() {
      mapWork.fifthStep()
    }
  },
  {
    title: "处理泄露",
    key: "06",
    times: 5,
    widget() {
      mapWork.sixthStep()
    }
  },
  {
    title: "完成营救",
    key: "07",
    times: 4,
    widget() {
      mapWork.seventhStep()
    }
  }
]

function countOn() {
  interval = setInterval(() => {
    counter.value--
    if (counter.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
}
</script>
<style lang="less" scoped>
.show-time {
  color: var(--mars-text-color);
}

.btn-mb {
  width: 146px;
  margin-bottom: 10px;
}

.btn-play {
  width: 300px !important;
}
</style>
