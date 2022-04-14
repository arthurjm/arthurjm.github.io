<template>
  <select id="demo-select" class="box" v-model="selectedDemo">
    <option value="none">Sélectionnez une démo</option>
    <option v-for="demo in demos" :key="demo">{{ demo }}</option>
  </select>
  <Bind v-if="selectedDemo === 'Bind'" />
  <Firework v-if="selectedDemo === 'Firework'" />
</template>

<script>
import Bind from "@/components/CSS/Bind.vue";
import Firework from "@/components/CSS/Firework.vue";

export default {
  name: "css-demo",

  components: {
    Bind,
    Firework,
  },

  data: function () {
    return {
      demos: ["Bind", "Firework"],
      selectedDemo: "none",
    };
  },
};
</script>

<style lang="scss" scoped>
select {
  color: var(--text-color);
  margin: 1% auto;
}
</style>
