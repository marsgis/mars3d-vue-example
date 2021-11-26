<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item label="范围">
        <a-radio-group v-model:value="formState.radioFanwei" @change="changeFanwei">
          <a-radio value="1">十进制</a-radio>
          <a-radio value="2">度分秒</a-radio>
          <a-radio value="3" title="2000平面坐标">平面坐标</a-radio>
        </a-radio-group>
      </a-form-item>

      <!-- 十进制的面板 -->
      <div v-show="formState.radioFanwei == '1'">
        <a-form-item label="经度" class="shijingzhi">
          <mars-input v-model:value="formState.jd"> </mars-input>
        </a-form-item>
        <a-form-item label="纬度" class="shijingzhi">
          <mars-input v-model:value="formState.wd"> </mars-input>
        </a-form-item>
        <a-form-item label="高程" class="shijingzhi">
          <mars-input v-model:value="formState.alt"> </mars-input>
        </a-form-item>
      </div>

      <!-- 度分秒的面板 -->
      <div v-show="formState.radioFanwei == '2'">
        <a-form-item label="经度">
          <a-space>
            <mars-input v-model:value="formState.jdDegree" class="dufenmiao"> </mars-input>°
            <mars-input v-model:value="formState.jdMinute" class="dufenmiao"> </mars-input>'
            <mars-input v-model:value="formState.jdSecond" class="dufenmiao"> </mars-input>"
          </a-space>
        </a-form-item>
        <a-form-item label="纬度">
          <a-space>
            <mars-input v-model:value="formState.wdDegree" class="dufenmiao"> </mars-input>°
            <mars-input v-model:value="formState.wdMinute" class="dufenmiao"> </mars-input>'
            <mars-input v-model:value="formState.wdSecond" class="dufenmiao"> </mars-input>"
          </a-space>
        </a-form-item>
        <a-form-item label="高程" class="shijingzhi">
          <mars-input v-model:value="formState.alt"> </mars-input>
        </a-form-item>
      </div>

      <!-- 平面坐标的面板 -->
      <div v-show="formState.radioFanwei == '3'">
        <a-form-item label="分带">
          <a-radio-group v-model:value="formState.radioFendai" @change="changeFendai">
            <a-radio value="1">三度带</a-radio>
            <a-radio value="2">六度带</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="纵坐标" class="shijingzhi">
          <mars-input v-model:value="formState.gk6X"> </mars-input>
        </a-form-item>
        <a-form-item label="横坐标" class="shijingzhi">
          <mars-input v-model:value="formState.gk6Y"> </mars-input>
        </a-form-item>
        <a-form-item label="高度值" class="shijingzhi">
          <mars-input v-model:value="formState.alt"> </mars-input>
        </a-form-item>
      </div>

      <a-form-item class="f-pt f-tac">
        <a-space>
          <mars-button @click="bindMourseClick">图上拾取</mars-button>
          <mars-button @click="submitCenter">坐标定位</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState = reactive({
  radioFanwei: "1",
  radioFendai: "2",
  jd: 0,
  wd: 0,
  alt: 0,
  jdDegree: 0,
  jdMinute: 0,
  jdSecond: 0,
  wdDegree: 0,
  wdMinute: 0,
  wdSecond: 0,
  gk6X: 0,
  gk6Y: 0
})

// 全局中间变量
var currJD: number
var currWD: number
var currGD: number

onMounted(() => {
  // 默认显示地图中心点坐标
  mapWork.eventTarget.on("befortUI", function (event: any) {
    const map = event.map
    var point = mapWork.map.getCenter()
    point.format()
    currJD = point.lng
    currWD = point.lat
    currGD = point.alt

    formState.jd = mapWork.mars3d.Util.formatNum(currJD, 6)
    formState.wd = mapWork.mars3d.Util.formatNum(currWD, 6)
    formState.alt = mapWork.mars3d.Util.formatNum(currGD, 6)
  })
})

const changeFanwei = () => {
  switch (formState.radioFanwei) {
    default:
      // 十进制
      formState.jd = mapWork.mars3d.Util.formatNum(currJD, 6)
      formState.wd = mapWork.mars3d.Util.formatNum(currWD, 6)
      formState.alt = mapWork.mars3d.Util.formatNum(currGD, 6)
      break
    case "2": // 度分秒
      formState.jdDegree = mapWork.mars3d.PointTrans.degree2dms(currJD).degree
      formState.jdMinute = mapWork.mars3d.PointTrans.degree2dms(currJD).minute
      formState.jdSecond = mapWork.mars3d.PointTrans.degree2dms(currJD).second

      formState.wdDegree = mapWork.mars3d.PointTrans.degree2dms(currWD).degree
      formState.wdMinute = mapWork.mars3d.PointTrans.degree2dms(currWD).minute
      formState.wdSecond = mapWork.mars3d.PointTrans.degree2dms(currWD).second

      formState.alt = mapWork.mars3d.Util.formatNum(currGD, 6)
      break
    case "3": // CGCS2000
      changeFendai()
      break
  }
}

const changeFendai = () => {
  if (formState.radioFendai == "2") {
    // 十进制转2000平面六分度
    var zoon6 = mapWork.mars3d.PointTrans.proj4Trans([currJD, currWD], mapWork.mars3d.CRS.EPSG4326, mapWork.mars3d.CRS.CGCS2000_GK_Zone_6)
    formState.gk6X = mapWork.mars3d.Util.formatNum(zoon6[0], 1)
    formState.gk6Y = mapWork.mars3d.Util.formatNum(zoon6[1], 1)
    formState.alt = mapWork.mars3d.Util.formatNum(currGD, 6)
  } else {
    // 十进制转2000平面三分度
    var zone3 = mapWork.mars3d.PointTrans.proj4Trans([currJD, currWD], mapWork.mars3d.CRS.EPSG4326, mapWork.mars3d.CRS.CGCS2000_GK_Zone_3)
    formState.gk6X = mapWork.mars3d.Util.formatNum(zone3[0], 1)
    formState.gk6Y = mapWork.mars3d.Util.formatNum(zone3[1], 1)
    formState.alt = mapWork.mars3d.Util.formatNum(currGD, 6)
  }
}

const bindMourseClick = () => {
  mapWork.map.setCursor(true)
  mapWork.map.once(mapWork.mars3d.EventType.click, function (event: any) {
    mapWork.map.setCursor(false)
    var cartesian = event.cartesian
    var point = mapWork.mars3d.LatLngPoint.fromCartesian(cartesian)
    point.format() // 经度、纬度、高度

    currJD = point.lng
    currWD = point.lat
    currGD = point.alt

    formState.jd = mapWork.mars3d.Util.formatNum(currJD, 6)
    formState.wd = mapWork.mars3d.Util.formatNum(currWD, 6)
    formState.alt = mapWork.mars3d.Util.formatNum(currGD, 6)
    changeFanwei()
    // 更新面板
    mapWork.updateMarker(false, currJD, currWD, currGD)
  })
}
const submitCenter = () => {
  if (formState.jd > 180 || formState.jd < -180) {
    mapWork.globalAlert("请输入有效的经度值！")
    return
  }
  if (formState.wd > 90 || formState.wd < -90) {
    mapWork.globalAlert("请输入有效的纬度值！")
    return
  }
  mapWork.updateMarker(true, formState.jd, formState.wd, formState.alt)
}
</script>
<style scoped lang="less">
.shijingzhi {
  width: 225px;
}
.dufenmiao {
  width: 90px;
}
</style>
