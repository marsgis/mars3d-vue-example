<template>
  <ConfigProvider :locale="locale">
    <a-spin :spinning="loading" wrapperClassName="global-spin">
      <div class="mars-main-view" id="mars-main-view">
        <div id="centerDiv3D">
          <div id="mars3dContainer" class="mars3d-container"></div>
        </div>
        <operation-pannel v-if="mapLoaded" @childMounted="onChildMounted" />
      </div>
    </a-spin>
  </ConfigProvider>
</template>

<script setup lang="ts">
/**
 * 渲染主入口
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2021-12-30
 */
import zhCN from "ant-design-vue/es/locale/zh_CN"
import { onMounted, provide, ref } from "vue"
import { ConfigProvider } from "ant-design-vue"
import { getQueryString } from "@/utils"
import OperationPannel from "@comp/mars-work/operation.vue"
import { getResourcesByLibs, loadScript, LoadSource, getCompConfig } from "mars-editor"


const resourcePath = (process.env.EXAMPLE_SOURCE_PATH || "") + "example/"

let mapWork: any | null = null

const loading = ref(false)

onMounted(async () => {
  const exampleId = getQueryString("id")

  const config = await getCompConfig(exampleId)
  if (config) {

    window.currentPath = `${resourcePath}${config?.main}/` // 当前示例的配置

    Object.defineProperty(window, "mapWork", {
      get() {
        return mapWork
      },
      set(value) {
        mapWork = value // 赋值后vue中使用
        if (config.usePannel) {
          mapLoaded.value = true // 开始构造vue面板
        } else {
          if (mapWork && mapWork.onMounted) {
            mapWork.onMounted(window._map)
          }
        }
      }
    })

    const loadQueen: string[] = []
    let resources = getResourcesByLibs(config.libs, process.env.BASE_URL + "lib/")
    if (config.resources) {
      resources = resources.concat([...config.resources])
    }

    resources.forEach((dep: string) => {
      let url
      if (dep.startsWith("/") || dep.startsWith("http") || dep.startsWith(resourcePath)) {
        url = dep
      } else {
        url = resourcePath + config.main + "/" + dep
      }
      loadQueen.push(url)
    })
    loadQueen.push("temp/styles/style.css")

    LoadSource(loadQueen).then(() => {
      loadScript(`${resourcePath}${config.main}/map.js`)
      loadScript("/temp/scripts/common.js")
    })
  }
})

const locale = zhCN

const mapInstance: any = null
provide("getMapInstance", () => {
  return mapInstance
})

const mapLoaded = ref(false)
function onChildMounted() {
  if (mapWork && mapWork.onMounted) {
    mapWork.onMounted(window._map)
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
