<template>
  <mars-dialog :visible="true" right="10" top="10">
    <mars-button href="http://mall.marsgis.cn/#/product/data-example3d" target="_blank" class="noBorder">购买离线数据</mars-button>
    <br />
    提示：该示例目的用于交付的离线数据的测试页<br />
    1、包括全国地形0-13级<br />
    2、包括全国电子及影像底图0-13级<br />
    3、包括所有模型数据：
    <a-space>
      <mars-button href="editor-vue.html?id=layer-tileset/type/list" target="_blank" class="noBorder">3dtiles模型</mars-button>
      <mars-button href="editor-vue.html?id=layer-graphic/draw/draw-model-list" target="_blank" class="noBorder">gltf模型</mars-button>
    </a-space>
    <br />
    4、 包括所有示例的apidemo、geojson等单文件数据


  </mars-dialog>
</template>

<script lang="ts" setup>
</script>
