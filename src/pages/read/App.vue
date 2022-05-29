<template>
  <ConfigProvider :locale="locale">
    <a-spin :spinning="loading" wrapperClassName="global-spin">
      <div id="mars-main-view" class="mars-main-view">
        <div id="centerDiv3D">
          <div id="mars3dContainer" class="mars3d-container"></div>
        </div>
        <main-operation v-if="showPannel" @childMounted="onChildMounted" @childUnmounted="childUnmounted" />

        <template v-if="mapLoaded">
          <template v-for="comp in widgets" :key="comp.key">
            <mars-widget v-if="openAtStart.includes(comp.name) && comp.visible" v-model:visible="comp.visible" :widget="comp" />
          </template>
        </template>
      </div>
    </a-spin>
  </ConfigProvider>
</template>

<script setup lang="ts">
/**
 * 渲染主入口
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-02-19
 */
import zhCN from "ant-design-vue/es/locale/zh_CN"
import { getCurrentInstance, onMounted, provide, ref, computed } from "vue"
import { ConfigProvider } from "ant-design-vue"
import { getQueryString } from "@mars/utils/mars-util"
import MainOperation from "@mars/components/mars-work/main-operation.vue"
import { Util } from "@marsgis/editor"
import { useWidgetStore } from "@mars/widgets/common/store/widget"
import MarsWidget from "@mars/widgets/widget.vue"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import { $message } from "@mars/components/mars-ui"

const globalProperties = getCurrentInstance()!.appContext.config.globalProperties

const resourcePath = (process.env.EXAMPLE_SOURCE_PATH || "") + "/"
const widgetStore = useWidgetStore()
const widgets = computed(() => widgetStore.state.widgets)
const openAtStart = computed(() => widgetStore.state.openAtStart)

const locale = zhCN

const mapLoaded = ref(false) // map加载完成

const showPannel = ref(false) // 是否加载面板

let mapWork: any | null = null

let mapInstance: any = null
provide("getMapInstance", () => {
  return mapInstance
})

const loading = ref(false)

const marsOnload = (map: any) => {
  mapInstance = map
  mapLoaded.value = true
}

onMounted(async () => {
  let exampleId = getQueryString("id")
  if (!exampleId) {
    alert("id不能为空")
    throw new Error("id不能为空")
  }

  exampleId = exampleId.replace(/\\/gm, "/") // 兼容反斜杠

  let exampleConf = await Util.getCompConfig(exampleId)

  if (!exampleConf) {
    $message("没有查询到当前id对应的配置")
    exampleConf = {
      id: exampleId,
      main: exampleId,
      fullName: "临时测试页面",
      name: "临时测试页面",
      hasPannel: Util.getQueryString("hasPannel") === "1"
    }
  }

  console.log("示例配置信息", exampleConf)

  window.currentPath = `${resourcePath}${exampleConf.main}/` // 当前示例的配置

  Object.defineProperty(window, "mapWork", {
    get() {
      return mapWork
    },
    set(value) {
      mapWork = value // 赋值后vue中使用
      marsOnload(window._mapInstance)
      if (exampleConf.hasPannel) {
        // 开始构造vue面板
        showPannel.value = true
      } else {
        onChildMounted()
      }
    }
  })

  const loadQueen: string[] = []
  let resources = Util.getResourcesByLibs(exampleConf.libs)
  if (exampleConf.resources) {
    resources = resources.concat([...exampleConf.resources])
  }

  resources.forEach((dep: string) => {
    let url
    if (dep.startsWith("/") || dep.startsWith("http") || dep.startsWith(resourcePath)) {
      url = dep
    } else {
      url = resourcePath + exampleConf.main + "/" + dep
    }
    loadQueen.push(url)
  })
  loadQueen.push("/lib/fonts/font-awesome/css/font-awesome.min.css")
  loadQueen.push("temp/css/style.css")

  Util.LoadSource(loadQueen).then(() => {
    Util.loadScript(`${resourcePath}${exampleConf.main}/map.js`, false)
    Util.loadScript("/temp/js/common.js", false)
  })
})

function onChildMounted() {
  const map = window._mapInstance

  globalProperties.map = map // map的挂载,方便vue组件内使用

  if (mapWork) {
    mapWork.map = map
    if (mapWork.onMounted) {
      mapWork.onMounted(map)
    }
  }
}

function childUnmounted() {
  if (mapWork.onUnmounted) {
    mapWork.onUnmounted()
  }
}

let loadingNum = 0
window.$showLoading = globalProperties.$showLoading = (type = "mask") => {
  loadingNum++
  if (type === "mask") {
    loading.value = true
  } else if (type === "top") {
    nprogress.start()
    const interval = setInterval(() => {
      if (nprogress.isStarted() && nprogress.status < 0.8) {
        nprogress.set(nprogress.status + 0.1)
      } else {
        clearInterval(interval)
      }
    }, 500)
  } else {
    loadingNum--
  }
}

window.$hideLoading = globalProperties.$hideLoading = (type = "mask") => {
  loadingNum = Math.max(0, --loadingNum)
  if (loadingNum === 0) {
    if (type === "mask") {
      loading.value = false
    } else if (type === "top") {
      nprogress.done()
    } else {
      loadingNum++
    }
  }
}
</script>

<style lang="less">
.mars-main-view {
  height: 100%;
  position: relative;
}
.global-spin,
.ant-spin-container {
  height: 100%;
}
</style>
