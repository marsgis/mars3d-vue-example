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
                <a-slider @change="alphaChange" :min="0" :max="1" :step="0.1" v-model:value="alphaVal" />
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
                <span class="pannel-item-label">演示视角</span>
                <mars-button @click="centerAtDX1">俯视视角</mars-button>
                <mars-button @click="centerAtDX2">地下视角</mars-button>
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

    const centerAtDX1 = () => {
      mapWork.centerAtDX1()
    }


    const centerAtDX2 = () => {
      mapWork.centerAtDX2()
    }

    return {
      centerAtDX1,
      centerAtDX2,
      chkUnderground,
      alphaChange,
      chkClippingPlanes,
      heightChange,
      clearWJ,
      drawExtent,
      drawPolygon,
      activeKey,
      heightVal,
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
  width: 310px;
  max-height: 600px;
  overflow-y: auto;
}
</style>
