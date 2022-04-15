<template>
  <input
    type="range"
    :min="data.min"
    :max="data.max"
    :step="data.step"
    :value="data.value"
    @input="$emit('update:data', $event.target.value)"
  />
</template>

<script>
export default {
  name: "control-panel-input-range",

  props: ["data"],

  emits: ["update:data"],
};
</script>

<style scoped>
input {
  background-color: green;
  width: 100%;
}
</style>
