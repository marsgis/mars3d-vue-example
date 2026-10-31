<template>
  <div class="page-wrap">
    <h1 class="sr-only">Mars3D 开发中心 · 功能示例</h1>
    <!--导航-->

    <div class="page-box">
      <!--   侧边栏  -->
      <div class="sidebar">
        <!-- 侧边栏交互全部由数据驱动：activeFirstId 高亮项 / expandedFirstId 展开项 / activeSecondId 选中子项 -->
        <div class="sidebar-1" v-for="item in examples_list" :key="item.id">
          <div
            class="side1-item"
            :class="{ active1: activeFirstId === item.id, active3: activeFirstId === item.id }"
            role="button"
            tabindex="0"
            :aria-expanded="expandedFirstId === item.id"
            @click="toggleFirst(item)"
            @keydown.enter.prevent="toggleFirst(item)"
            @keydown.space.prevent="toggleFirst(item)"
          >
            <i class="fa" :class="item.icon"></i>
            <p class="name" :class="{ active3: activeFirstId === item.id }">{{ item.name }} ({{ item.count }})</p>
            <mars-icon icon="right" width="24"></mars-icon>
          </div>
          <div class="sidebar-2" v-show="expandedFirstId === item.id">
            <div
              class="side2-item"
              :class="{ active2: activeSecondId === item1.id }"
              @click="clickSecond(item1)"
              v-for="item1 in item.children"
              :key="item1.id"
            >
              <span>·</span>
              <a class="a" :class="{ linkActive: activeSecondId === item1.id }" :href="'#' + item1.id">
                {{ item1.name }} ({{ item1.count }})</a
              >
            </div>
          </div>
        </div>

        <div class="download">
          <div>【{{ loading ? "示例加载中…" : `共 ${allCount} 个示例` }}】</div>
          <div>
            <a href="javascript:downloadExampleTxt();">下载功能清单.txt</a>
          </div>
          <div>
            <a href="javascript:downloadExampleCsv()">下载功能清单.csv</a>
          </div>
        </div>
      </div>
      <!--主体-->
      <div class="contain">
        <div class="search-wrap" :class="{ wrapIsfixed: wrapFixed }">
          <div class="search-l">
            <input type="text" placeholder="请输入示例名称筛选..." aria-label="按示例名称筛选" v-model="searchValue" @input="searchDetail" @keyup.enter="searchDetail" />
            <div
              class="ss-pic"
              role="button"
              tabindex="0"
              aria-label="搜索"
              @click="searchDetail"
              @keydown.enter.prevent="searchDetail"
              @keydown.space.prevent="searchDetail"
            >
              <mars-icon icon="search" width="24" color="#ffffff"></mars-icon>
            </div>
            <div
              class="clear-value"
              v-if="searchValue"
              role="button"
              tabindex="0"
              aria-label="清空筛选"
              @click="clearAll"
              @keydown.enter.prevent="clearAll"
              @keydown.space.prevent="clearAll"
            >
              <mars-icon icon="close" width="18"></mars-icon>
            </div>
          </div>

          <div class="search-r" tabindex="0">
            <mars-icon class="icon" icon="help" size="20" fill="#bbbbbb"></mars-icon>
            <p class="look">查看说明</p>
            <div class="sanjiao"></div>
            <div class="sanjiao-1"></div>
            <div class="explain">
              <div class="explain-wrap">
                <div class="sm-pic">
                  <mars-icon icon="agreement" size="24" fill="#008aff"></mars-icon>
                </div>
                <div class="sm">说明</div>
                <div class="line1">
                  <span></span>
                </div>
              </div>
              <p>1. 您可以访问<a :href="`https://gitee.com/marsgis/mars3d-vue-example`" target="_black">GitHub</a>下载当前示例代码到本地运行</p>
              <p>2. 存在已知问题 的示例打开后有对应已知问题提示，此处仅做演示。</p>
              <p>
                3. 如果您访问体验当中发现bug问题或有好的建议，欢迎随时反馈给
                <a href="http://marsgis.cn/weixin.html" target="_blank">我们</a>.
              </p>
              <p>
                4. 如果缺少您想要的示例，可以整理需求发送邮件至
                <a href="mailto:wh@marsgis.cn" rel="nofollow">wh@marsgis.cn</a>
              </p>
              <p>
                <a target="_black" href="https://www.npmjs.com/package/mars3d">
                  <img alt="Npm version" src="https://img.shields.io/npm/v/mars3d?style=flat&logo=npm&label=版本号" />
                </a>

                <a target="_black" href="https://www.npmjs.com/package/mars3d">
                  <img alt="Npm downloads" src="https://img.shields.io/npm/dt/mars3d?style=flat&logo=npm&label=下载量" />
                </a>
                <a target="_black" href="https://github.com/marsgis/mars3d">
                  <img alt="GitHub stars" src="https://img.shields.io/github/stars/marsgis/mars3d?style=flat&logo=github" />
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="load-error" v-if="loadFailed" role="alert">
          示例清单加载失败，请检查网络后刷新页面重试。
        </div>

        <!-- 清单到达前保持骨架，避免显示空列表与“共 0 个示例”（D026） -->
        <div class="list-skeleton" v-if="loading" aria-hidden="true">
          <div class="sk-row" v-for="n in 4" :key="n">
            <div class="sk-block" v-for="m in 4" :key="m"></div>
          </div>
        </div>

        <div class="big" v-for="item in list" :key="item.id">
          <div class="start" v-if="item.children.length !== 0">
            <!-- <div class="fa" :class="item.icon"></div> -->
            <p>{{ item.name }} ({{ item.count }})</p>
            <div class="line">
              <span></span>
            </div>
          </div>
          <!--创建三维场景-->
          <div :id="item1.id" class="three" v-for="item1 in item.children" :key="item1.id">
            <h3 v-if="item1.children.length !== 0">
              {{ item1.name }} ({{ item1.count }})
              <div class="question" v-if="item1.details">
                <mars-icon class="icon" icon="help" size="20" fill="#bbbbbb"></mars-icon>
                <div class="sanjiao1"></div>
                <div class="sanjiao2"></div>
                <div class="tan1">
                  <p>
                    <span class="color">说明：</span>
                    {{ item1.details }}
                  </p>
                </div>
              </div>
            </h3>
            <ul>
              <template v-for="item2 in item1.children" :key="item2.id">
                <li
                  v-if="item2.main && item2.hidden != true"
                  :title="getTitle(item2)"
                  @click="jumpurl(item2)"
                  style="overflow: hidden"
                >
                  <span class="hideInfo">{{ item2.main  }} , {{ item2.api  }}</span>
                  <span title="这是最近新加的功能" :class="{ newVer: isNew }" v-if="isnew(item2)">新</span>
                  <div class="pic">
                    <img :src="item2.thumbnail" :alt="item2.name" loading="lazy" decoding="async" :onerror="imgOnError" />
                  </div>
                  <p>
                    {{ item2.name }}

                    <svg
                      class="vue"
                      v-if="item2.hasPannel === true"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMinYMin meet"
                      viewBox="0 0 256 221"
                    >
                      <path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36z" />
                      <path fill="#41B883" d="M0 0l128 220.8L256 0h-51.2L128 132.48 50.56 0H0z" />
                      <path fill="#35495E" d="M50.56 0L128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56z" />
                    </svg>

                    <span
                      v-show="item2.plugins"
                      style="color: rgba(0, 147, 255, 0.7)"
                      :title="`'该功能需要引入 mars3d-${item2.plugins}.js 插件才能使用。'`"
                      >[{{ item2.plugins }}插件]</span
                    >
                  </p>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarsIcon from "@mars/components/mars-ui/mars-icon/index.vue"

export default {
  components: {
    MarsIcon
  },
  data() {
    return {
      examples_list: [],
      list: [], // 当前列表（含查询筛选后的）
      indexActive: "",
      navActive: 1, // head的激活顺序
      searchValue: "",
      allCount: 0, // 示例总数
      isNew: true, // 提示点的样式
      wrapFixed: false,
      loading: true, // 清单与编辑器模块加载中（D026：动态引入 @marsgis/editor）
      loadFailed: false, // 示例清单（config/example.json）加载失败提示
      activeFirstId: null, // 侧边栏当前高亮的一级分类id
      expandedFirstId: null, // 侧边栏当前展开的一级分类id（再点一次收起）
      activeSecondId: null // 侧边栏当前选中的二级分类id
    }
  },
  created() {
    window.scrollTo(0, 0)
    this.initExampleList()
  },
  mounted() {
    // 挂载全局下载方法（供模板中的a链接调用）
    window.downloadExampleTxt = () => {
      this.downloadFile("Mars3D功能清单.txt", this.getAllName())
    }
    window.downloadExampleCsv = () => {
      this.downloadFile("Mars3D功能清单.csv", this.getVerDiff())
    }
    window.addEventListener("scroll", this.isfixed)
  },
  beforeUnmount() {
    // 组件卸载时移除滚动监听，避免事件泄漏
    window.removeEventListener("scroll", this.isfixed)
  },
  methods: {
    // D026：动态引入 @marsgis/editor，首页首屏不再预加载编辑器与 monaco。
    // 编辑器实例仅用于初始化 Util 的静态配置（configSourceUrl 等），Util.getExampleList() 依赖该配置。
    async initExampleList() {
      try {
        const { Editor: MarsgisEditor, Util } = await import("@marsgis/editor")
        this.marsEditor = new MarsgisEditor({
          baseUrl: process.env.BASE_URL,
          thumbnailPublicPath: `${process.env.BASE_URL}config/thumbnail/`,
          configSourceUrl: `${process.env.BASE_URL}config/example.json`
        })
        const data = await Util.getExampleList()
        this.examples_list = data
        this.list = data
        this.allCount = Util.totalCount
      } catch {
        // 清单请求失败（网络/404）或编辑器模块加载失败时给出可见反馈，避免只显示空列表
        this.loadFailed = true
      } finally {
        this.loading = false
      }
    },
    clearBoth() {
      this.clearAll()
    },
    // 点击一级分类：首次点击高亮并展开，再次点击收起（高亮保留，与原DOM交互行为一致）
    toggleFirst(item) {
      if (this.activeFirstId === item.id) {
        this.expandedFirstId = null
      } else {
        this.activeFirstId = item.id
        this.expandedFirstId = item.id
      }
    },
    // 点击二级分类：标记选中并清除搜索筛选
    clickSecond(item1) {
      this.activeSecondId = item1.id
      this.clearBoth()
    },
    isnew(item) {
      return item.new
    },
    isfixed() {
      const scrolltopTemp = document.documentElement.scrollTop || document.body.scrollTop
      if (scrolltopTemp > 70) {
        return (this.wrapFixed = true)
      } else {
        return (this.wrapFixed = false)
      }
    },
    getTitle(item) {
        let title = `${item.name}
目录：${item.main}`
      if (item.api) {
        const api_name = item.api.replaceAll(".html", "").replaceAll("global.", "")
        title += `
API：mars3d.${api_name}`
      }
      return title
    },
    jumpurl(item) {
      this.$emit("jump", item)
    },
    imgOnError(e) {
      const img = e.target || e.srcElement
      if (!img) {
        return
      }
      console.log(`缺少缩略图图片: ${img.src}`)

      img.src = `${process.env.BASE_URL}config/thumbnail/map-options-basemaps.jpg`
      img.onerror = null

    },
    searchDetail() {
      if (!this.searchValue) {
        this.list = this.examples_list
        return
      }
      const searchValue = this.searchValue.toLowerCase()
      const newList = JSON.parse(JSON.stringify(this.examples_list))
      newList.forEach((item) => {
        if (item.children) {
          const childrenList = []
          item.children.forEach((ite) => {
            if (ite.children) {
              const lis = []
              ite.children.forEach((itemes) => {
                if (itemes.name.toLowerCase().search(searchValue) !== -1 || (itemes.api && itemes.api.toLowerCase().search(searchValue) !== -1)) {
                  lis.push(itemes)
                }
              })
              ite.children = lis
            }
            if (ite.children.length !== 0) {
              childrenList.push(ite)
            }
          })
          item.children = childrenList
        }
      })
      this.list = newList
    },
    clearAll() {
      this.searchValue = ""
      this.searchDetail()
    },
    downloadFile(fileName, string) {
      const blob = new Blob([string])
      const aLink = document.createElement("a")
      aLink.download = fileName
      aLink.href = URL.createObjectURL(blob)
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
    },
    getStandardName(item) {
      let name = item.name
      if (name.indexOf("Demo") !== -1) {
        return false
      }

      const idx = name.indexOf("(")
      if (idx !== -1) {
        name = name.substring(0, idx)
      }

      return name
    },

    getVerDiff() {
      let arrNew = "序号,分类,子分类,功能名称,示例ID\n"
      let index = 0
      const cacheNames = {}
      this.examples_list.forEach((item) => {
        if (!item.children || item.download === false) {
          return
        }
        item.children.forEach((item2) => {
          if (!item2.children || item2.download === false) {
            return
          }
          item2.children.forEach((item3) => {
            if (item3.download === false || item3.hidden) {
              return
            }
            const name = this.getStandardName(item3)
            if (!name) {
              return
            }
            if (cacheNames[name]) {
              // console.log("已存在", name)
              return
            }
            cacheNames[name] = true

            arrNew += `${++index},${item.name},${item2.name},${name},${item3.main}\n`
          })
        })
      })

      return arrNew
    },

    getAllName() {
      let arrNew = "Mars3D功能清单："
      const qianzhui = "功能 "

      let index1 = 0
      const cacheNames = {}
      this.examples_list.forEach((item) => {
        if (!item.children || item.download === false) {
          return
        }
        arrNew += `\n\n${qianzhui}${++index1}  ${item.name}`

        let index2 = 0
        item.children.forEach((item2) => {
          if (!item2.children || item2.download === false) {
            return
          }
          arrNew += `\n${qianzhui}${index1}.${++index2}  ${item2.name}：`

          let index3 = 0
          item2.children.forEach((item3) => {
            if (item3.download === false || item3.hidden) {
              return
            }
            const name = this.getStandardName(item3)
            if (!name) {
              return
            }
            if (cacheNames[name]) {
              // console.log("已存在", name)
              return
            }
            cacheNames[name] = true

            ++index3
            if (index3 === 1) {
              arrNew += `${name}`
            } else {
              arrNew += `,${name}`
            }
          })
          // arrNew += "\n"
        })
      })
      return arrNew
    }
  }
}
</script>

<style scoped>
.page-wrap {
  margin-top: 68px;
  padding-top: 0px;
  height: 100vh;
  box-sizing: border-box;
  background: #fff;
}

/* 仅屏幕阅读器可见（不引入视觉变化） */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 键盘焦点可见：覆盖入口页全局 input:focus{outline:0} 的影响 */
.side1-item:focus-visible,
.ss-pic:focus-visible,
.clear-value:focus-visible,
.search-r:focus-visible,
.search-l input:focus-visible {
  outline: 2px solid #008aff;
  outline-offset: 2px;
}
.page-box {
  height: calc(100vh - 0px);
}

/*侧边栏*/
.sidebar {
  width: 240px;
  z-index: 10;
  position: fixed;
  top: 68px;
  left: 0px;
  overflow-y: auto;
  padding-top: 10px;
  box-sizing: border-box;
  /* border: 1px solid red;*/
  background-color: #2a2d3e;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

img {
  object-fit: cover;
}
.active1 {
  background: linear-gradient(90deg, #008aff 0%, #51a6ee 100%);
}
.active3 {
  color: #fff;
  opacity: 1;
}
.side1-item {
  margin-left: 10px;
  margin-bottom: 10px;
  width: 230px;
  height: 36px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
}
.side1-item .fa {
  text-align: center;
  width: 30px;
  font-size: 20px;
}
.side1-item .name {
  width: 165px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 20px;
  color: #fff;
  opacity: 0.6;
  margin-left: 10px;
}
.side1-item .iconfont {
  color: #ffffff;
  opacity: 0.6;
  font-size: 12px;
}
.sidebar-2 {
  margin-left: 0px;
  /* 展开/收起由模板中的 v-show 控制，此处不再写死 display */
  left: 0px;
  top: 46px;
  padding-bottom: 10px;
}
.side2-item {
  cursor: pointer;
  margin-left: 40px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #ffffff;
  opacity: 0.6;
  margin-bottom: 19px;
}
.side2-item span {
  padding-right: 10px;
}
.side2-item a {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #ffffff;
  opacity: 0.6;
}
.active2 {
  color: #f08519;
}
/* 二级分类选中时链接的高亮态（对应原JS中内联设置的color/opacity） */
.side2-item .linkActive {
  color: #f08519;
  opacity: 1;
}
.active3 {
  opacity: 1 !important;
}
/*主体*/
.contain {
  box-sizing: border-box;
}
.search-wrap {
  margin-top: 5px;
  margin-left: 38px;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  background-color: #fff;
}
/* 滚动后吸顶：随 .contain 宽度布局，固定在顶栏（68px）下方，避免被 fixed 顶栏遮挡或横向跳位 */
.wrapIsfixed {
  position: sticky;
  top: 68px;
  padding: 5px 0;
  margin-top: 0;
}
/* 清单加载失败提示：与卡片列表同列，保证失败时仍有可见反馈 */
.load-error {
  margin: 40px 0 0 38px;
  padding: 16px 20px;
  max-width: 520px;
  border: 1px solid #f0b4b4;
  border-radius: 6px;
  background-color: #fff7f7;
  color: #c0392b;
  font-size: 14px;
  line-height: 22px;
}
/* 清单骨架（D026）：与卡片网格同列，清单到达后由真实列表替换 */
.list-skeleton {
  margin: 30px 0 0 38px;

  .sk-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 26px;
  }

  .sk-block {
    width: 22%;
    height: 160px;
    border-radius: 6px;
    background: linear-gradient(90deg, #f2f3f5 25%, #e8eaed 37%, #f2f3f5 63%);
    background-size: 400% 100%;
    animation: sk-shimmer 1.4s ease infinite;
  }
}
@keyframes sk-shimmer {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
/* 992px 以下顶栏为 80px 白色导航 */
@media screen and (max-width: 992px) {
  .search-wrap.wrapIsfixed {
    top: 80px;
  }
}
.search-l {
  align-items: center;
  position: relative;
  width: 298px;
  height: 40px;
  display: flex;
  border: 1px solid #008aff;
  background-color: #ffffffb5;
  border-radius: 10px;
}
.search-l input {
  background-color: rgba(0, 0, 0, 0);
  border: none;
}
.clear-value {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.clear-value img {
  width: 100%;
  height: 100%;
}
input {
  width: 170px;
  height: 19px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  margin-left: 15px;
}
input::-webkit-input-placeholder {
  color: #cccccc;
}
input:-moz-placeholder {
  color: #008aff;
}
input::-moz-placeholder {
  color: #008aff;
}
input:-ms-input-placeholder {
  color: #008aff;
}
.ss-pic {
  width: 62px;
  height: 40px;
  padding-top: 8px;
  box-sizing: border-box;
  background: linear-gradient(180deg, #008aff 0%, #4ca4ef 100%);
  position: absolute;
  top: 0px;
  right: 0px;
  border-radius: 0px 10px 10px 0px;
  text-align: center;
  cursor: pointer;
}
.ss-pic img {
  height: 18px;
  margin-top: 11px;
}
.search-r {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 26px;
  color: #666666;
  position: relative;
}
.search-r .look {
  font-size: 16px;
  line-height: 20px;
  color: #666666;
  width: 80px;
  margin-right: 20px;
  vertical-align: middle;
}
.search-r:hover .sanjiao,
.search-r:focus-within .sanjiao {
  display: block;
}
.search-r:hover .sanjiao-1,
.search-r:focus-within .sanjiao-1 {
  display: block;
}
.search-r:hover .explain,
.search-r:focus-within .explain {
  display: block;
}

.search-r .icon {
  margin-right: 5px;
  vertical-align: middle;
  cursor: pointer;
  line-height: 1;
}

/*弹框*/
.sanjiao {
  position: absolute;
  top: 40px;
  left: 48px;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  box-shadow: 0px 3px 12px rgba(120, 120, 120, 0.22);
  transform: rotate(45deg);
  z-index: 2;
  display: none;
}

.sanjiao-1 {
  position: absolute;
  top: 50px;
  left: 48px;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  transform: rotate(45deg);
  z-index: 10;
  display: none;
}
.explain {
  position: absolute;
  top: 54px;
  left: -470px;
  width: 582px;
  box-shadow: 0px 3px 12px rgba(120, 120, 120, 0.22);
  z-index: 999;
  background-color: #fff;
  display: none;
}

.explain-wrap {
  display: flex;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 20px;
}

.sm-pic {
  margin-left: 17px;
  padding: 8px 10px;
  background: rgba(38, 151, 255, 0.2);
  border-radius: 10px;
}

.sm-pic img {
  height: 18px;
  margin-left: 15px;
  margin-top: 12px;
}

.sm {
  font-size: 19px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 26px;
  margin-left: 14px;
  color: #000000;
}

.line1 {
  width: 426px;
  height: 1px;
  background-color: #e1f0ff;
  position: relative;
  margin-left: 13px;
}

.line1 span {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 106px;
  height: 1px;
  background-color: #008aff;
}

.explain p {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 15px;
  color: #666666;
  opacity: 0.6;
  margin-bottom: 20px;
  margin-left: 27px;
}
.explain p a {
  color: rgb(34 128 254);
}

.explain p span {
  padding-left: 5px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #008aff;
  opacity: 1;
}

.newVer {
  width: 33px;
  height: 26px;
  position: relative;
  bottom: -2%;
  left: 45%;
  background: red;
  display: inline-block;
  border-radius: 50%;
  margin: -7px;
  color: white;
  text-align: center;
  line-height: 26px;
}

/*快速开始*/
.start {
  margin-left: 15px;
  margin-top: 15px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 26px;
  color: #666666;
  display: flex;
  align-items: center;
}

.start p {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 26px;
  color: #018afe;
  height: 30px;
}

.start .fa {
  width: 35px;
  height: 35px;
  line-height: 35px;
  font-size: 18px;
  text-align: center;
  color: #018afe;
  margin-right: 10px;
  border-radius: 10px;
  background-color: rgba(76, 164, 239, 0.1);
}

.start .line {
  flex: 1;
  height: 1px;
  background-color: #dfdfdf;
  margin-left: 32px;
  position: relative;
}

.start span {
  width: 105px;
  height: 1px;
  background-color: #4e97d9;
  position: absolute;
  top: 0px;
  left: 0px;
}

.big .three {
  border-bottom: 1px solid #dfdfdf;
  padding-top: 22px;
  padding-bottom: 16px;
  margin-left: 37px;
  margin-bottom: 8px;
}

.big .three:nth-last-child(1) {
  border-bottom: none;
}

.three h3 {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 26px;
  color: #000000;
  display: flex;
  align-items: center;
}

.three ul {
  margin-top: 15px;
  flex-wrap: wrap;
  display: flex;
}

.three li {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 3px 6px rgba(112, 112, 112, 0.53);
  background-color: #ffffff;
  opacity: 1;
  border-radius: 10px;
  margin-bottom: 28px;
  padding-top: 10px;
  cursor: pointer;
}

/*.three  li:nth-child(5n+5){*/
/*    margin-right: unset;*/
/*}*/
.three li:hover {
  box-shadow: 0px 6px 12px rgba(0, 138, 255, 0.56);
  background-color: #018afe;
  transition-duration: 1s;
}

.three li:hover p {
  color: #ffffff;
  transition-duration: 1s;
}

.three li .pic {
  width: 90%;
  height: 80%;
  margin: 3px 0px 10px 0px;
}

.three li .pic img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  min-height: 150px;
}
.three li .vue {
  width: 14px;
  vertical-align: middle;
}

.three ul p {
  width: 90%;
  padding: 0px 5%;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #000000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.three {
  /*width: 1521px;*/
  margin-left: 37px;
  padding-top: 22px;
}

.three .three ul {
  border: none;
}

.question {
  width: 27px;
  height: 27px;
  position: relative;
}

.question .icon {
  line-height: 1;
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;
}

.hideInfo{
  color: rgba(255, 255, 255, 0.01);
  position: absolute;
  left: 0;
  right: 0;
}

.three .tan1 {
  min-width: 500px;
  top: -10px;
  left: 70px;
  position: absolute;
  background: #ffffff;
  border-radius: 6px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  display: none;
  z-index: 4;
  box-shadow: 0px 3px 12px rgba(120, 120, 120, 0.22);
}

.three .tan1 p {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #aaaaaa;
  padding: 15px 5px;
}

.tan1 span {
  color: #000000;
}

.three .sanjiao1 {
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  box-shadow: 0px 3px 10px 12px rgba(120, 120, 120, 0.22);
  transform: rotate(45deg);
  margin-left: 20px;
  display: none;
  position: absolute;
  top: 4px;
  left: 40px;
  z-index: 2;
}

.three .sanjiao2 {
  width: 20px;
  height: 20px;
  background-color: #fff;
  transform: rotate(45deg);
  margin-left: 20px;
  display: none;
  position: absolute;
  top: 4px;
  left: 40px;
  z-index: 5;
}

.three .question:hover .tan1 {
  display: block;
}

.three .question:hover .sanjiao1 {
  display: block;
}

.three .question:hover .sanjiao2 {
  display: block;
}

.no-message {
  width: 328px;
  height: 236px;
}

.no-message img {
  width: 100%;
  height: 100%;
}

.no-title {
  font-size: 26px;
  color: #8d8d8d;
}

.all-no {
  width: 500px;
  height: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 200px;
}

.select {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -118px;
  background-color: #2a2d3e;
  width: 150px;
  height: 100px;
  z-index: 999;
}

.nav-item:hover {
  color: #f08519;
}

.nav-item:hover .select {
  color: #fff;
}

.item-select {
  line-height: 50px;
  padding-left: 20px;
  box-sizing: border-box;
}

.item-select:hover {
  color: #f08519;
}

.download {
  text-align: center;
  margin: 40px 0 20px 0;
}
.download div {
  margin-top: 5px;
}

@media screen and (min-width: 770px) {
  /*侧边导航*/
  .pc_hide {
    display: none !important;
  }
  .sidebar {
    height: 100vh;
  }

  /*右侧内容*/
  .contain {
    padding: 10px 0px 0px 250px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .nav-item {
    font-size: 20px;
    line-height: 26px;
    color: #ffffff;
    margin-right: 60px;
    cursor: pointer;
    position: relative;
  }
}

@media screen and (min-width: 1400px) {
  .three li {
    width: 18%;
    margin-right: 1.5%;
    max-width: 280px;
  }
}
@media screen and (max-width: 1150px) {
  .nav-item {
    font-size: 20px;
    line-height: 26px;
    color: #ffffff;
    margin-right: 40px;
    cursor: pointer;
    position: relative;
  }
}
@media screen and (max-width: 1400px) and (min-width: 1200px) {
  .three li {
    width: 23%;
    margin-right: 1.5%;
  }
}
@media screen and (max-width: 1200px) and (min-width: 990px) {
  .three li {
    width: 31%;
    margin-right: 1.5%;
  }
}
@media screen and (max-width: 990px) and (min-width: 770px) {
  .three li {
    width: 48%;
    margin-right: 1.5%;
  }
}
@media screen and (max-width: 770px) {
  .mobile_hide {
    display: none !important;
  }
  .nav-item {
    font-size: 20px;
    line-height: 26px;
    color: #ffffff;
    flex: 1;
    cursor: pointer;
    position: relative;
  }
  /*侧边导航*/
  .sidebar {
    display: none !important;
  }
  .three li {
    width: 95%;
  }

  .search-wrap {
    margin-top: 100px;
  }
  .search-wrap.wrapIsfixed {
    margin-top: 0;
    top: 80px;
  }
  .search-l {
    height: 35px;
  }
  .ss-pic {
    width: 40px;
    height: 35px;
  }
  .ss-pic img {
    width: 24px;
    margin-top: 8px;
    margin-left: 8px;
  }
  .explain {
    width: 300px;
    left: -190px;
    height: 320px;
  }
  .search-r img {
    padding: 0px 7px;
  }
  .line1 {
    width: 150px;
  }
}
@media screen and (max-width: 1280px) {
  .explain {
    width: 464px;
    left: -343px;
  }
  .explain .sm {
    width: 55px;
    font-size: 15px;
  }
  .explain-wrap {
    margin: 10px 0px;
  }
  .explain p {
    font-size: 13px;
    margin-top: 0px;
    margin-bottom: 10px;
  }
  .sm-pic {
    width: 40px;
    height: 40px;
    font-size: 0px;
  }
  .sm-pic img {
    margin-left: 12px;
    margin-top: 10px;
  }
}
</style>
