<template>
  <div id="control-panel" class="box">
    <Section
      v-for="(d, i) in data"
      :key="i"
      :data="d"
      @update:data="(d) => $emit('update:data', d)"
    />
  </div>
</template>

<script>
import Section from "@/components/ControlPanel/Section.vue";

export default {
  name: "control-panel-main",

  components: {
    Section,
  },

  props: ["name", "data"],

  emits: ["update:data"],
};
</script>

<style scoped>
#control-panel {
  z-index: 1;
  position: relative;
  width: 400px;
  margin: 1% auto;
}
</style>
