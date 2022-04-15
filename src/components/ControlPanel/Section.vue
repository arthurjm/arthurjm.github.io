<template>
  <div class="control-panel-section">
    <h3>
      {{ name }}
    </h3>
    <Control
      v-for="(d, i) in data"
      :key="i"
      :data="d"
      :name="i"
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

  props: ["data", "name"],

  emits: ["update:data"],
};
</script>

<style lang="scss" scoped>
.control-panel-section {
  display: flex;
  flex-direction: column;
  width: 100%;
}

h3::first-letter {
  text-transform: uppercase;
}
</style>
