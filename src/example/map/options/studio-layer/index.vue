<template>
  <div ></div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import axios from "axios"
import * as mapWork from "./map.js"
import { getQueryString } from "@mars/utils/mars-util"

const defaulUrl = "https://studio-api.mars3d.cn/api/files/graphic/1869941680784351232/config.json" // 默认加载的图层配置文件地址
const url = getQueryString("url") ?? defaulUrl

onMounted(async() => {
 const token = await getToken()
 mapWork.loadLayer(url, token)
})
async function getToken() {
  const result = await axios.post("https://studio-api.mars3d.cn/api/system/login", {
    grantType: "1",
    username: "guest",
    password: "guest"
  }, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  }
  )

  return result.data.data.token
}

</script>
