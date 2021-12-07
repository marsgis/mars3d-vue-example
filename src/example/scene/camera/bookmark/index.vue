<template>
  <PannelBox class="infoView infoview">
    <div class="f-mb">
      <a-space>
        <mars-input v-model:value="formState.input" placeholder="输入名称"></mars-input>
        <mars-button @click="butAddTxtName">添加</mars-button>
      </a-space>
    </div>
    <div class="bookmarkView">
      <div v-bind:class="{ noFound: formState.found, addNewImg: formState.noFound }" :key="value.name" v-for="(value, index) in formState.imgObject">
        <img class="markImg" :src="value.img" @click="flytoView(value)" v-show="formState.noFound == true" />
        <p>{{ value.name }}</p>
        <mars-button class="deleteImg" @click="butDeleteTxtName(index)" v-show="formState.noFound == true">
          <img src="img/icon/delete.svg" />
        </mars-button>
      </div>
    </div>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const formState = reactive({
  input: "",
  noFound: false,
  found: true,
  imgObject: [{ id: 0, name: "没有匹配的值", img: "", center: "" }]
})

onMounted(() => {
  mapWork.getLocalStorage()
})

mapWork.eventTarget.on("localStorage", (item: any) => {
  // 删除未匹配项
  if (formState.imgObject[0].img === "") {
    formState.imgObject.splice(0, 1)
    formState.noFound = true
    formState.found = false
  }
  formState.imgObject.push(item)
})

let index = 0
// 添加视角书签
const butAddTxtName = () => {
  const name = formState.input
  const imgObject = formState.imgObject

  if (!name) {
    window.$message("请输入名称")
    return
  }

  // 删除未匹配项
  if (imgObject[0].img === "") {
    formState.imgObject.splice(0, 1)
    formState.noFound = true
    formState.found = false
  }

  // 不能使用相同名称
  if (name) {
    for (var i = 0; i < imgObject.length; i++) {
      if (imgObject[i].name == name) {
        window.$message(name + " 已存在，请更换名称!")
        return
      }
    }
  } else {
    formState.imgObject = []
  }

  // 动态的获取index
  mapWork.butAddTxtName(index++, name)

  // UI处理
  formState.input = ""
}

// 触发事件
mapWork.eventTarget.on("addImgObject", (item: any) => {
  formState.imgObject.push({ id: item.id, name: item.name, img: item.image, center: item.center })

  // 记录到历史
  mapWork.setLocalStorage(formState.imgObject)
})

// 视角操作
const flytoView = (val: any) => {
  mapWork.flytoView(val.center)
}

const butDeleteTxtName = (index: number) => {
  formState.imgObject.splice(index, 1)

  if (formState.imgObject.length == 0) {
    formState.imgObject = [{ id: 0, name: "没有匹配的值", img: "", center: "" }]
    formState.noFound = false
    formState.found = true
  }
  mapWork.setLocalStorage(formState.imgObject)
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
