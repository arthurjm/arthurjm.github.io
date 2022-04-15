<template>
  <div id="control-panel" class="box">
    <div id="control-panel-title">
      <div>Panneau de contrôle</div>
      <div class="toggle" @click="toggleDisplay">
        <font-awesome-icon icon="arrow-right" :rotation="display ? 90 : 0" />
      </div>
    </div>
    <div v-show="display" id="control-panel-sections">
      <Section
        v-for="(d, i) in data"
        :key="i"
        :data="d"
        :name="i"
        @update:data="(d) => $emit('update:data', d)"
      />
    </div>
  </div>
</template>

<script>
import Section from "@/components/ControlPanel/Section.vue";

export default {
  name: "control-panel-main",

  components: {
    Section,
  },

  props: ["data"],

  emits: ["update:data"],

  data: function () {
    return {
      display: true,
    };
  },

  methods: {
    toggleDisplay() {
      this.display = !this.display;
    },
  },
};
</script>

<style lang="scss" scoped>
#control-panel {
  z-index: 1;
  position: relative;
  width: 400px;
  margin: 1% auto;
}

#control-panel-sections {
  width: 100%;
}

#control-panel-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.2em;
}

#control-panel-title > * {
  margin-left: auto;
}

.toggle {
  display: flex;
  cursor: pointer;
  background-color: var(--border-primary-color);
  color: var(--background-primary-color);
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.toggle > svg {
  margin: auto;
}
</style>
