<template>
  <PannelBox class="infoView infoview">
    <a-form-item>
      <a-space>
        <mars-input v-model:value="formState.input" placeholder="输入名称"></mars-input>
        <mars-button @click="butAddTxtName">添加</mars-button>
      </a-space>
    </a-form-item>
    <div class="bookmarkView">
      <div v-bind:class="{ noFound: formState.found, addNewImg: formState.noFound }" :key="value.name" v-for="(value, index) in formState.imgObject">
        <img class="markImg" :src="value.img" @click="flytoView(value)" v-show="formState.noFound == true" />
        <p>{{ value.name }}</p>
        <mars-button class="deleteImg" @click="butDeleteTxtName(index)" v-show="formState.noFound == true"
          ><img src="img/icon/delete.svg"
        /></mars-button>
      </div>
    </div>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
let arrView: any[] = []

const formState = reactive({
  input: "",
  noFound: false,
  found: true,
  imgObject: [{ id: 0, name: "没有匹配的值", img: "", center: "" }]
})

let index = 0
onMounted(() => {
  try {
    const data: any = JSON.parse(localStorage.getItem("bookmark")!)
    if (data && data.length > 0) {
      console.log("历史数据", data)

      for (var i = 0; i < data.length; i++) {
        const item = data[i]
      }

      index = data[data.length - 1].id
    }
  } catch (err: any) {}
})

// 添加视角书签
const butAddTxtName = () => {
  const name = formState.input
  if (!name) {
    window.$message("请输入名称")
    return
  }

  // 删除未匹配项
  if (formState.imgObject[0].img == "") {
    formState.imgObject.splice(0, 1)
    formState.noFound = true
    formState.found = false
  }

  // 不能使用相同名称
  if (arrView) {
    for (var i = 0; i < arrView.length; i++) {
      if (arrView[i].name == name) {
        window.$message(name + " 已存在，请更换名称!")
        return
      }
    }
  } else {
    arrView = []
  }

  // 动态的获取index
  const item = {
    id: index++,
    name: name,
    image: "",
    center: mapWork.map.getCameraView()
  }
  arrView.push(item)

  mapWork.map.expImage({
    download: false,
    width: 300,
    callback: function (image: any) {
      item.image = image
      formState.imgObject.push({ id: item.id, name: item.name, img: item.image, center: item.center })

      // 记录到历史
      localStorage.setItem("bookmark", JSON.stringify(arrView))
    }
  })

  // UI处理
  formState.input = ""
}

// 视角操作
const flytoView = (val: any) => {
  mapWork.flytoView(val.center)
}

const butDeleteTxtName = (index: number) => {
  deleteTxtName(formState.imgObject[index])
  formState.imgObject.splice(index, 1)

  if (arrView.length == 0) {
    formState.imgObject = [{ id: 0, name: "没有匹配的值", img: "", center: "" }]
    formState.noFound = false
    formState.found = true
  }
}

function deleteTxtName(item: any) {
  for (var i = 0; i < arrView.length; i++) {
    if (arrView[i].name == item.name) {
      arrView.splice(i, 1)
      break
    }
  }
  localStorage.setItem("bookmark", JSON.stringify(arrView))
}
</script>
<style scoped lang="less">
.infoview {
  height: 91%;
}
.bookmarkView {
  width: 265px;
  height: calc(100% - 50px);
  border: 1px solid white;
  border-radius: 5px;
  margin: 10px 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
}
.noFound {
  border: none;
  padding-bottom: 15px;
  border-bottom: 0.5px solid white;
  width: 100%;
  padding-left: 30%;
}
.markImg {
  height: 160px;
  width: 230px;
  z-index: 0;
}
.addNewImg {
  position: relative;
  border: 1px solid white;
  margin-top: 22px;
}
.markImg :hover {
  background-color: red;
}
.addNewImg p:after {
  content: "";
  width: calc(100% + 20px);
  height: 1px;
  background-color: white;
  position: absolute;
  bottom: -11px;
  left: -11px;
}
.addNewImg p {
  display: inline-block;
  width: 160px;
  white-space: nowrap;
  overflow-x: hidden;
  text-align: center;
  text-overflow: ellipsis;
  margin-left: 39px;
  color: white;
}
.addNewImg p:hover {
  display: inline-block;
  width: 160px;
  white-space: normal;
  word-wrap: break-word;
}
.deleteImg {
  width: 54px;
  height: 19px;
  border: none;
  position: absolute;
  top: 154px;
  right: -7px;
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
}
</style>
