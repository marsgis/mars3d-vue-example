<template>
  <mars-dialog :visible="true" right="10" top="10" width="250">
    <div class="f-mb keyboard-btns">
      <span>演示视角：</span>
      <mars-button class="f-push-10-r" @click="onChangeCenterAtDX1">室内</mars-button>
      <mars-button @click="onChangeCenterAtDX2">室外</mars-button>
    </div>
    <div class="f-push-15-t  f-push-15-b">
      <a-space>
        <span title="平移的步长（单位：米）">平移步长:</span>
        <mars-slider v-model:value="slideStep" @change="onChangeSlider" tooltipPlacement="bottom" :min="0" :max="300"
          :step="0.01" />
      </a-space>
    </div>
  </mars-dialog>


  <mars-dialog :visible="true" left="10" top="10">
    <div class="keyboard-img">
      <div v-for="(item, index) in codeList" :key="index" class="zm" :class="{ 'active': activeValue === item.codeValue, [item.codeClass]: true }">{{ item.codeName }}</div>

    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import * as mapWork from "./map.js"

const slideStep = ref<number>(10)
const activeValue = ref(0)


const list = [
    {
      codeValue: 81,
      codeName: "Q",
      codeClass: "zm_q"
    },
    {
      codeValue: 87,
      codeName: "W",
      codeClass: "zm_w"
    },
    {
      codeValue: 69,
      codeName: "E",
      codeClass: "zm_e"
    },
    {
      codeValue: 65,
      codeName: "A",
      codeClass: "zm_a"
    },
    {
      codeValue: 83,
      codeName: "S",
      codeClass: "zm_s"
    },
    {
      codeValue: 68,
      codeName: "D",
      codeClass: "zm_d"
    },
    {
      codeValue: 85,
      codeName: "U",
      codeClass: "zm_u"
    },
    {
      codeValue: 73,
      codeName: "I",
      codeClass: "zm_i"
    },
    {
      codeValue: 79,
      codeName: "O",
      codeClass: "zm_o"
    },
    {
      codeValue: 74,
      codeName: "J",
      codeClass: "zm_j"
    },
    {
      codeValue: 75,
      codeName: "K",
      codeClass: "zm_k"
    },
    {
      codeValue: 76,
      codeName: "L",
      codeClass: "zm_l"
    },
    {
      codeValue: 38,
      codeName: "↑",
      codeClass: "zm_up"
    },
    {
      codeValue: 37,
      codeName: "←",
      codeClass: "zm_left"
    },
    {
      codeValue: 40,
      codeName: "↓",
      codeClass: "zm_down"
    },
    {
      codeValue: 39,
      codeName: "→",
      codeClass: "zm_right"
    }

  ]

  const codeList = computed(() => list.filter((item) => item.codeValue === activeValue.value))


const onChangeSlider = () => {
  mapWork.changeSlider(slideStep.value)
}
const onChangeCenterAtDX1 = () => {
  mapWork.centerAtDX1()
}
const onChangeCenterAtDX2 = () => {
  mapWork.centerAtDX2()
}

mapWork.eventTarget.on("keydown", function (event) {
  activeValue.value = event.keyCode
})
mapWork.eventTarget.on("keyup", function (event) {
  activeValue.value = undefined
})

</script>
<style scoped lang="less">
.ant-slider {
  width: 120px;
}

.keyboard-btns {
  display: grid;
  grid-template-columns: 70px repeat(2, 1fr);
  align-items: center;
}


.keyboard-img {
  width: 447px;
  height: 180px;

  background-image: url(./img/keyboard.png);

  .zm {
    width: 28px;
    height: 25px;
    padding: 4px 8px;
    // border: 1px solid #abacae;
    border-radius: 4px;
    color: #fdfdfd;
    text-align: center;
    position: absolute;
    padding: 0px;
    line-height: 25px;

    &:hover {
      background: #006aff;
    }
  }

  .active {
    background: #006aff;
  }


  .zm_q {
    left: 66px;
    top: 74px;
  }
  .zm_w {
    left: 97px;
    top: 74px;
  }
  .zm_e {
    left: 126px;
    top: 74px;
  }
  .zm_a {
    left: 73px;
    top: 103px;
  }
  .zm_s {
    left: 103px;
    top: 103px;
  }
  .zm_d {
    left: 132px;
    top: 103px;
  }

  .zm_u {
    right: 205px;
    top: 74px;
  }
  .zm_i {
    right: 176px;
    top: 74px;
  }
  .zm_o {
    right: 148px;
    top: 74px;
  }
  .zm_j {
    right: 199px;
    top: 103px;
  }
  .zm_k {
    right: 169px;
    top: 103px;
  }
  .zm_l {
    right: 139px;
    top: 103px;
  }
  .zm_up {
    right: 57px;
    bottom: 34px;
    height: 13px;
    line-height: 13px;
  }
  .zm_left {
    right: 88px;
    bottom: 22px;
    height: 13px;
    line-height: 13px;
  }
  .zm_down {
    right: 57px;
    bottom: 22px;
    height: 13px;
    line-height: 13px;
  }
  .zm_right {
    right: 28px;
    bottom: 22px;
    height: 13px;
    line-height: 13px;
  }
}
</style>
