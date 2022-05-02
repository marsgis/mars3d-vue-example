<template>
  <mars-pannel :visible="true" right="10" top="10"> </mars-pannel>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useWidget } from "@mars/widgets/common/store/widget"

const { activate } = useWidget()

onMounted(() => {
  activate("query-poi")
})
</script>
