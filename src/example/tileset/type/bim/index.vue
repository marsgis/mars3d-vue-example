<template>
  <PannelBox class="infoView">
    <div class="infoView-content">
      <a-form>
        <a-collapse v-model:activeKey="activeKey">
          <!-- 自定义切换图标 -->
          <template #expandIcon>
            <icon-down-c />
          </template>
          <!-- 数据处理面板 -->
          <a-collapse-panel key="1" header="地下模式">
            <a-form-item>
              <a-space>
                <span class="pannel-item-label">是否开启:</span>
                <a-checkbox @change="chkUnderground" v-model:checked="formState.enabledGround">开启/关闭</a-checkbox>
              </a-space>
            </a-form-item>
            <a-form-item>
              <a-space>
                <span class="pannel-item-label">地表透明度:</span>
                <a-slider @change="alphaChange" :min="0" :max="1" :step="0.1" v-model:value="alphaVal" />{{ alphaVal }}
              </a-space>
            </a-form-item>
          </a-collapse-panel>

          <!-- 参数调试面板 -->
          <a-collapse-panel key="2" header="地下开挖">
            <a-form-item>
              <a-space>
                <span class="pannel-item-label">是否开挖</span>
                <a-checkbox @change="chkClippingPlanes" v-model:checked="formState.enabledClipping">是/否</a-checkbox>
              </a-space>
            </a-form-item>
            <a-form-item>
              <a-space>
                <span class="pannel-item-label">开挖深度</span>
                <mars-input-number @change="heightChange" :min="-500" :max="999" :step="1" v-model:value="heightVal"></mars-input-number>
              </a-space>
            </a-form-item>

            <a-form-item>
              <a-space>
                <span class="pannel-item-label">绘制</span>
                <mars-button @click="drawExtent">矩形</mars-button>
                <mars-button @click="drawPolygon">多边形</mars-button>
                <mars-button @click="clearWJ">清除</mars-button>
              </a-space>
            </a-form-item>
          </a-collapse-panel>

          <a-collapse-panel key="3" header="模型裁剪">
            <a-form-item>
              <a-space>
                <span class="pannel-item-label">裁剪距离</span>
                <a-slider @change="distanceChange" :min="-50" :max="50" :step="0.1" v-model:value="distanceVal" />{{ distanceVal }}
              </a-space>
            </a-form-item>

            <a-form-item>
              <a-space>
                <span class="pannel-item-label">裁剪</span>
                <mars-button @click="clipTop">切顶</mars-button>
                <mars-button @click="clipBottom">切底</mars-button>
                <mars-button @click="clipLine">按线切</mars-button>
              </a-space>
            </a-form-item>

             <a-form-item>
              <a-space>
                <span class="pannel-item-label"></span>
                <mars-button @click="clipPoly">内挖</mars-button>
                <mars-button @click="clipPoly2">外切</mars-button>
                <mars-button @click="clearClip">清除</mars-button>
              </a-space>
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </div>
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  enabledGround: boolean
  enabledClipping: boolean
}
export default defineComponent({
  components: {
    PannelBox
  },

  setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}
    const activeKey = ref(["1", "2", "3"])

    const formState: UnwrapRef<FormState> = reactive({
      enabledGround: false,
      enabledClipping: true
    })

    // 透明度
    const alphaVal = ref<number>(0.5)

    // 深度
    const heightVal = ref<number>(30)

    // 裁剪距离
    const distanceVal = ref<number>(0)

    onMounted(() => {
      mapWork.terrainClips(heightVal.value)
    })

    const chkUnderground = () => {
      mapWork.chkUnderground(formState.enabledGround, alphaVal.value)
    }

    // 透明度改变
    const alphaChange = () => {
      mapWork.alphaChange(alphaVal.value)
    }

    const chkClippingPlanes = () => {
      mapWork.chkClippingPlanes(formState.enabledClipping)
    }

    // 深度改变
    const heightChange = () => {
      mapWork.heightChange(heightVal.value)
    }
    // 绘制矩形
    const drawExtent = () => {
      mapWork.drawExtent()
    }
    // 绘制多边形
    const drawPolygon = () => {
      mapWork.drawPolygon()
    }
    // 清除
    const clearWJ = () => {
      mapWork.clearWJ()
    }

    const distanceChange = () => {
      mapWork.distanceChange(distanceVal.value)
    }

    // 切顶

    const clipTop = () => {
      mapWork.clipTop()
    }

    // 切底
    const clipBottom = () => {
      mapWork.clipBottom()
    }

    // 按线切
    const clipLine = () => {
      mapWork.clipLine()
    }

    // 内切
    const clipPoly = () => {
      mapWork.clipPoly()
    }

    const clipPoly2 = () => {
      mapWork.clipPoly2()
    }
    const clearClip = () => {
      mapWork.clearClip()
    }

    return {
      clearClip,
      clipPoly,
      clipPoly2,
      clipLine,
      clipTop,
      clipBottom,
      chkUnderground,
      alphaChange,
      chkClippingPlanes,
      distanceChange,
      heightChange,
      clearWJ,
      drawExtent,
      drawPolygon,
      activeKey,
      heightVal,
      distanceVal,
      formState,
      alphaVal
    }
  }
})
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}

.ant-slider {
  width: 110px;
}

.infoView-content {
  width: 330px;
  max-height: 600px;
  overflow-y: auto;
}
</style>
