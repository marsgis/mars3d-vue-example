<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="cacheViewAircraft">取消跟踪</mars-button>
      <mars-button @click="viewAircraft">跟踪视角</mars-button>

      <mars-button @click="viewTopDown">上方视角</mars-button>
      <mars-button @click="viewSide">侧方视角</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const viewAircraft = () => {
  mapWork.viewAircraft()
}

const cacheViewAircraft = () => {
  mapWork.cacheViewAircraft()
}

const viewTopDown = () => {
  mapWork.viewTopDown()
}

const viewSide = () => {
  mapWork.viewSide()
}
</script>
