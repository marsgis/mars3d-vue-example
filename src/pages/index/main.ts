import { createApp } from "vue"
import Application from "./App.vue"
import { install } from "@icon-park/vue-next/es/all"
import marsEditorInstall from "mars-editor"

const app = createApp(Application)
install(app)

marsEditorInstall(app, {
  baseUrl: process.env.BASE_URL,
  configLibs: window.configLibs,
  configSource: `${process.env.BASE_URL}config/example.json`
})

app.mount("#app")
