<template>
  <PannelBox class="animation-pannel" v-auto-height="300">
    <a-space>
      <mars-button v-if="!isPlay || isPause" @click="play">
        <icon-play />
        <span>{{ isPause ? "继续" : "开始" }}</span>
      </mars-button>
      <mars-button v-if="isPlay && !isPause" @click="pause">
        <icon-pause-one />
        <span>暂停</span>
      </mars-button>
      <mars-button v-if="isPlay" @click="stop">
        <icon-power />
        <span>停止</span>
      </mars-button>
    </a-space>
    <a-tree
      class="f-mb"
      :show-line="true"
      :show-icon="true"
      :tree-data="treeData"
      v-model:selectedKeys="selectedKeys"
      :defaultExpandAll="true"
      :selectable="true"
    >
      <template #title="{ title, isLeaf, dataRef }">
        <span @click="startBegin(dataRef)" v-if="isLeaf" type="link">{{ title }}({{ dataRef.times }}秒)</span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>
    <template v-if="isPlay">
      <h3 class="f-mb">总时长：{{ totalTimes }}</h3>
      <h3 class="f-mb">当前: {{ currentWork }}&nbsp;{{ counter }}秒</h3>
    </template>
  </PannelBox>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
const mapWork = window.mapWork || {}

const isPlay = ref(false)
const isPause = ref(false)
const totalTimes = ref("")
const currentWork = ref("")
const counter = ref(0)
const selectedKeys = ref<any[]>([])
let animations: any[] = []
let currentIndex = 0
let timer: any = null
let interval: any = null

const play = () => {
  isPlay.value = true
  isPause.value = false
  start()
}
const pause = () => {
  clearTimeout(timer)
  currentIndex--
  mapWork.map.cancelFlight()
  mapWork.stopRotatePoint()
  isPause.value = true
}
const stop = () => {
  isPlay.value = false
  isPause.value = false
  currentIndex = 0
  mapWork.map.cancelFlight()
  mapWork.stopRotatePoint()
  mapWork.clear()
  clearTimeout(timer)
  clearInterval(interval)
}

const start = () => {
  if (timer) {
    clearTimeout(timer)
  }
  if (interval) {
    clearInterval(interval)
  }
  if (currentIndex < animations.length) {
    const animate = animations[currentIndex]
    selectedKeys.value = [animate.key]
    currentWork.value = `${animate.title}(${animate.times}秒)`
    counter.value = animate.times
    countOn()
    animate.widget()
    currentIndex++
    timer = setTimeout(() => {
      console.log(currentIndex)
      start()
    }, animate.times * 1000)
  } else {
    stop()
  }
}

const startBegin = (item: any) => {
  currentIndex = item.index
  play()
}

function countOn() {
  interval = setInterval(() => {
    counter.value--
    if (counter.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
}

const treeData: any[] = [
  {
    title: "特征点",
    key: "01",
    children: [
      {
        title: "山顶点",
        key: "01-01",
        times: 6,
        widget() {
          mapWork.workPoint1Sdd()
        }
      },
      {
        title: "鞍部点",
        key: "01-02",
        times: 10,
        widget() {
          mapWork.workPoint2Abd()
        }
      },
      {
        title: "坡度变换点",
        key: "01-03",
        times: 6,
        widget() {
          mapWork.workPoint3Pdbhd()
        }
      },
      {
        title: "山脚点",
        key: "01-04",
        times: 6,
        widget() {
          mapWork.workPoint4Sjd()
        }
      },
      {
        title: "山脚坡度变换点",
        key: "01-05",
        times: 6,
        widget() {
          mapWork.workPoint5Sjpdbhd()
        }
      },
      {
        title: "倾斜变换点",
        key: "01-06",
        times: 6,
        widget() {
          mapWork.workPoint6Qxbhd()
        }
      }
    ]
  },
  {
    title: "特征线",
    key: "02",
    children: [
      {
        title: "山脊线",
        key: "02-01",
        times: 6,
        widget() {
          mapWork.workLine1Sjx()
        }
      },
      {
        title: "山谷线",
        key: "02-02",
        times: 8,
        widget() {
          mapWork.workLine2Sgx()
        }
      },
      {
        title: "俯瞰",
        key: "02-03",
        times: 5,
        widget() {
          mapWork.workLine3Fk()
        }
      }
    ]
  },
  {
    title: "绘制过程",
    key: "03",
    children: [
      {
        title: "计算通过点",
        key: "03-01",
        times: 6,
        widget() {
          mapWork.workDgx1Point()
        }
      },
      {
        title: "等高线绘制",
        key: "03-02",
        times: 6,
        widget() {
          mapWork.workDgx2Line()
        }
      },
      {
        title: "等高线结果",
        key: "03-03",
        times: 10,
        widget() {
          mapWork.workDgx3End()
        }
      }
    ]
  }
]

onMounted(() => {
  let i = 0
  let time = 0
  treeData.forEach((item) => {
    animations = animations.concat(
      item.children.map((it: any) => {
        time += it.times
        it.index = i
        i++
        return it
      })
    )
  })
  totalTimes.value = `${Math.floor(time / 60)}分${time % 60}秒`
})
</script>

<style scoped lang="less">
.animation-pannel {
  top: 10px;
  right: 10px;
  width: 240px;
  overflow-y: auto;
}
</style>
