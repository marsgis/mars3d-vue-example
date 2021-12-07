<template>
  <div class="interest-search-pannel">
    <a-auto-complete
      class="search-input"
      ref="complete"
      v-model:value="searchTxt"
      size="large"
      :options="dataSource"
      @search="handleSearch"
      @select="selectPoint"
      @focus="handleSearch(searchTxt)"
    >
      <a-input-search size="large" placeholder="搜索 地点" @search="searchPoint">
        <template #enterButton>
          <a-button>
            <icon-search size="20" fill="#FFF" />
          </a-button>
        </template>
      </a-input-search>
    </a-auto-complete>
    <div class="query-site" v-if="siteListShow">
      <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="siteSource">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.type">
              <template #title>
                <a @click.stop="flyTo(item)">{{ item.name }}</a>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * 公共组件：PIO查询
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { ref } from "vue"
import { isLonLat } from "@/utils/index"

const props = defineProps({
  mapWork: {
    type: Object,
    required: true
  }
})

const storageName = "mars3d_queryGaodePOI"
const siteListShow = ref(false)

// 各类数据
const searchTxt = ref("")
const dataSource = ref<any[]>([])
const siteSource = ref<any[]>([])
const complete = ref()

// 创建矢量图层
const graphicLayer = new props.mapWork.mars3d.layer.GraphicLayer({
  name: "PIO查询",
  pid: 99 // 图层管理 中使用，父节点id
})

// 触发自动事件，将矢量图层添加到地图中
props.mapWork.eventTarget.on("mapLoaded", () => {
  props.mapWork.map.addLayer(graphicLayer)
})

// 鼠标单击后的信息面板弹窗
let address: any = null
graphicLayer.bindPopup(function (event: any) {
  const item = event.graphic?.attr
  if (!item) {
    return
  }
  let inHtml = `<div class="mars-popup-titile"><a href="https://www.amap.com/detail/${item.id}"  target="_black" style="color: #ffffff; ">${item.name}</a></div><div class="mars-popup-content" >`

  if (item.tel != "") {
    inHtml += "<div><label>电话</label>" + item.tel + "</div>"
  }

  if (item.address) {
    inHtml += "<div><label>地址</label>" + item.address + "</div>"
  }
  if (item.type) {
    const fl = item.type
    if (fl != "") {
      inHtml += "<div><label>类别</label>" + fl + "</div>"
    }
  }
  inHtml += "</div>"
  return inHtml
})

// GaodePOI查询
const queryPoi = new props.mapWork.mars3d.query.GaodePOI({
  // city: '合肥市',
})

// 根据经纬度坐标获取地址
props.mapWork.eventTarget.on("mapCameraChange", () => {
  // const radius = props.mapWork.map.camera.positionCartographic.height // 单位：米
  queryPoi.getAddress({
    location: props.mapWork.map.getCenter(),
    success: (result: any) => {
      address = result
    }
  })
})

// 搜寻输入框数据之前的提示数据 以及搜寻过的历史数据  通过列表展现
const handleSearch = (val: string) => {
  if (!val) {
    showHistoryList()
    return
  }
  siteListShow.value = false
  queryPoi.autoTip({
    text: val,
    city: address?.city,
    location: props.mapWork.map.getCenter(),
    success: (result: any) => {
      dataSource.value = result.list.map((item: any) => {
        return {
          value: item.name
        }
      })
    }
  })
}

// 展示搜寻过的历史数据
const showHistoryList = () => {
  try {
    const historys = JSON.parse(localStorage.getItem(storageName)!)
    dataSource.value = (historys || []).map((item: any) => ({ value: item }))
  } catch (err: any) {
    throw new Error(err)
  }
}

// 输入关键字，开始查询
const searchPoint = () => {
  const text = searchTxt.value
  if (!text) {
    alert("请输入搜索关键字！")
    return
  }

  if (isLonLat(text)) {
    centerAtLonLat(text)
    return
  }

  addHistory(text)

  selectPoint(searchTxt.value)

  setTimeout(() => {
    complete.value.blur()
  }, 100)
}

// 开始查询并加载数据
const selectPoint = async (value: any) => {
  await querySiteList(value, 1)
  siteListShow.value = true
}

// 表格数据内部
const pagination = {
  onChange: (page: number) => {
    querySiteList(searchTxt.value, page)
  },
  size: "small",
  total: 0,
  pageSize: 6,
  showSizeChanger: false,
  showLessItems: true
}

/**
 * 加载查询之后的数据，通过表格展示出来
 * @param {string} text  输入框输入的文字
 * @param {number} page  分页页码，常与count一起搭配使用
 * @returns {void} 无
 */
function querySiteList(text: string, page: number) {
  return new Promise((resolve, reject) => {
    queryPoi.queryText({
      text,
      count: 6,
      page: page - 1,
      city: address?.city,
      success: (result: any) => {
        resolve(result)

        pagination.total = Number(result.allcount) || 0
        siteSource.value = result.list || []

        showPOIArr(result.list || [])
      }
    })
  })
}

/**
 * 加载查询之后的数据，通过矢量数据展示出来
 * @param {any} arr 查询之后的数据
 * @returns {void} 无
 */
function showPOIArr(arr: any) {
  clearLayers()

  arr.forEach((item: any) => {
    const jd = Number(item.lng)
    const wd = Number(item.lat)
    if (isNaN(jd) || isNaN(wd)) {
      return
    }

    item.lng = jd
    item.lat = wd

    // 添加实体
    const graphic = new props.mapWork.mars3d.graphic.PointEntity({
      position: props.mapWork.Cesium.Cartesian3.fromDegrees(jd, wd),
      style: {
        pixelSize: 10,
        color: "#3388ff",
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2,
        scaleByDistance: new props.mapWork.Cesium.NearFarScalar(1000, 1, 1000000, 0.1),
        clampToGround: true, // 贴地
        visibleDepth: false, // 是否被遮挡
        label: {
          text: item.name,
          font_size: 20,
          color: "rgb(240,255,255)",
          outline: true,
          outlineWidth: 2,
          outlineColor: props.mapWork.Cesium.Color.BLACK,
          horizontalOrigin: props.mapWork.Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: props.mapWork.Cesium.VerticalOrigin.BOTTOM,
          pixelOffsetY: -10, // 偏移量
          distanceDisplayCondition: new props.mapWork.Cesium.DistanceDisplayCondition(0.0, 200000),
          clampToGround: true, // 贴地
          visibleDepth: false // 是否被遮挡
        }
      },
      attr: item
    })
    graphicLayer.addGraphic(graphic)

    item._graphic = graphic
  })

  if (arr.length > 1) {
    graphicLayer.flyTo()
  }
}

// 定位至矢量图层
function flyTo(item: any) {
  const graphic = item._graphic
  if (graphic === null) {
    return alert(item.name + " 无经纬度坐标信息！")
  }

  props.mapWork.map.flyToGraphic(graphic, { radius: 2000 })

  setTimeout(() => {
    graphicLayer.openPopup(graphic)
  }, 3000)
}

/**
 * 判断是否为经纬度值，
 * 若是，加载为矢量数据且定位至该矢量数据
 * 若否，返回
 * @param {any} text 输入框输入的关键字
 * @returns {void} 无
 */
function centerAtLonLat(text: any) {
  const arr = text.split(",")
  if (arr.length != 2) {
    return
  }

  const jd = Number(arr[0])
  const wd = Number(arr[1])
  if (isNaN(jd) || isNaN(wd)) {
    return
  }

  // 添加实体
  const graphic = new props.mapWork.mars3d.graphic.PointEntity({
    position: props.mapWork.Cesium.Cartesian3.fromDegrees(jd, wd),
    style: {
      color: "#3388ff",
      pixelSize: 10,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2,
      scaleByDistance: new props.mapWork.Cesium.NearFarScalar(1000, 1, 1000000, 0.1),
      clampToGround: true, // 贴地
      visibleDepth: false // 是否被遮挡
    }
  })
  graphicLayer.addGraphic(graphic)

  graphic.bindPopup(`<div class="mars-popup-titile">坐标定位</div>
              <div class="mars-popup-content" >
                <div><label>经度</label> ${jd}</div>
                <div><label>纬度</label>${wd}</div>
              </div>`)

  graphic.openHighlight()

  graphic.flyTo({
    radius: 1000, // 点数据：radius控制视距距离
    scale: 1.5, // 线面数据：scale控制边界的放大比例
    complete: () => {
      graphic.openPopup()
    }
  })
}

/**
 * 将需要搜查的关键字记录进历史数据中
 * @param {any} data 输入框输入的关键字
 * @returns {void} 无
 */
function addHistory(data: any) {
  try {
    const arrHistory = JSON.parse(localStorage.getItem(storageName)!) || []
    if (!arrHistory.includes(data)) {
      arrHistory.unshift(data)
    }
    localStorage.setItem(storageName, JSON.stringify(arrHistory.slice(0, 10)))
  } catch (err: any) {
    throw new Error(err)
  }
}

function clearLayers() {
  graphicLayer.closePopup()
  graphicLayer.clear()
}
</script>

<style lang="less" scoped>
.interest-search-pannel {
  position: absolute;
  padding: 0;
  width: 300px;
  top: 10px;
  left: 10px;
  .search-input {
    width: 100%;
  }
}
.query-site {
  position: absolute;
  border: 1px solid #cde1de;
  border-top: none;
  padding: 10px;
  width: 100%;
  background-color: rgba(63, 72, 84, 0.9);
}
:deep(.ant-btn-lg) {
  background-color: rgb(10, 142, 253);
  border-color: rgb(10, 142, 253);
}
:deep(.ant-input-lg) {
  font-size: 16px;
  border-color: #4db3ff;
}
:deep(.ant-list-item) {
  padding: 0;
}
:deep(.ant-list-item-meta) {
  margin: 0;
  padding: 10px 0;
}
:deep(.ant-list-item-meta-title) {
  font-size: 14px;
  margin: 0;
}
</style>
