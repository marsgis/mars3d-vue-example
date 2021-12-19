import { createApp } from "vue"
import Application from "./App.vue"
import marsEditorInstall from "mars-editor"

const app = createApp(Application)

marsEditorInstall(app, {
  baseUrl: process.env.BASE_URL,
  configLibs: window.configLibs,
  configSource: `${process.env.BASE_URL}config/example.json`
})

app.mount("#app")
