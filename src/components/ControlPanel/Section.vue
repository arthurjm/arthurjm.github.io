<template>
  <div>
    <h3>
      {{ data.name }}
    </h3>
    <Control
      v-for="(d, i) in data.content"
      :key="i"
      :data="d"
      @update:data="(d) => $emit('update:data', d)"
    />
  </div>
</template>

<script>
import Control from "@/components/ControlPanel/Control.vue";

export default {
  name: "control-panel-section",

  components: {
    Control,
  },

  props: ["data"],

  emits: ["update:data"],
};
</script>

<style></style>
