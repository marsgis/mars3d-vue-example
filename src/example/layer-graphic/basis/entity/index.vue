<template>
  <mars-pannel :visible="true" right="10" top="10" width="450">
    <layer-state />
    <div class="f-mb f-pt">
      <a-row>
        <a-col :span="4">点状:</a-col>
        <a-col :span="19">
          <div class="entity-button-contain" :key="item.name" v-for="item in list.point">
            <mars-button :href="item.href" target="_blank">{{ item.name }}</mars-button>
          </div>
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row>
        <a-col :span="4">线面状:</a-col>
        <a-col :span="19">
          <div class="entity-button-contain" :key="item.name" v-for="item in list.polyline">
            <mars-button :href="item.href" target="_blank">{{ item.name }}</mars-button>
          </div>
        </a-col>
      </a-row>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import LayerState from "@mars/components/mars-sample/layer-state.vue"

const list = {
  point: [
    { name: "文字", href: "editor.html?id=graphic/entity/label" },
    { name: "点", href: "editor.html?id=graphic/entity/point" },
    { name: "图标点", href: "editor.html?id=graphic/entity/billboard" },
    { name: "平面", href: "editor.html?id=graphic/entity/plane" },
    { name: "盒子", href: "editor.html?id=graphic/entity/box" },
    { name: "圆", href: "editor.html?id=graphic/entity/circle" },
    { name: "圆锥", href: "editor.html?id=graphic/entity/cylinder" },
    { name: "球", href: "editor.html?id=graphic/entity/ellipsoid" },
    { name: "小模型", href: "editor.html?id=graphic/entity/model" }
  ],
  polyline: [
    { name: "线", href: "editor.html?id=graphic/entity/polyline" },
    { name: "管道", href: "editor.html?id=graphic/entity/polylineVolume" },
    { name: "走廊", href: "editor.html?id=graphic/entity/corridor" },
    { name: "墙", href: "editor.html?id=graphic/entity/wall" },
    { name: "矩形", href: "editor.html?id=graphic/entity/rectangle" },
    { name: "面", href: "editor.html?id=graphic/entity/polygon" }
  ]
}
</script>
<style scoped lang="less">
.ant-col-4 {
  max-width: 11.666667%;
}
.entity-button-contain {
  float: left;
  .mars-button {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
