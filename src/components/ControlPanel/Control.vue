<template>
  <div class="control-panel-input">
    <label>{{ data.name }} ({{ data.value }}{{ data.unit }})</label>
    <InputRange
      v-if="data.type === 'InputRange'"
      :data="data"
      @update:data="update"
    />
  </div>
</template>

<script>
import InputRange from "@/components/ControlPanel/InputRange.vue";

export default {
  name: "control-panel-control",

  components: {
    InputRange,
  },

  props: ["data", "name"],

  emits: ["update:data"],

  methods: {
    update(d) {
      let data = this.data;
      data.value = d;
      this.$emit("update:data", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.control-panel-input {
  display: flex;
  justify-content: space-between;
}
</style>
