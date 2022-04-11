<template>
  <div id="controls">
    <font-awesome-icon
      id="controls-icon"
      icon="keyboard"
      @click="toggleMenu"
      size="2x"
    />
    <div id="controls-menu" v-show="display">
      <div
        v-for="(category, cat) in controlsHandler.controls"
        :key="cat"
        class="category"
      >
        <div>{{ cat }}</div>
        <div v-for="(control, name) in category" :key="name" class="control">
          <div class="control-name">{{ names[name] }}</div>
          <button class="control-key" @click="updateKey(cat, name)">
            {{ control.key }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { names } from "@/js/actionNames.js";
import { controlsHandler } from "@/js/controlsHandler.js";

export default {
  name: "controls-component",

  data: function () {
    return {
      display: false,
      names,
      controlsHandler,
    };
  },

  methods: {
    updateKey(category, name) {
      document.addEventListener(
        "keydown",
        (event) => {
          controlsHandler.updateKey(category, name, event.key);
          event.stopImmediatePropagation();
        },
        { capture: true, once: true }
      );
    },

    toggleMenu() {
      this.display = !this.display;
    },
  },
};
</script>

<style scoped>
#controls {
  margin-right: 1%;
}

#controls-icon,
.control-key {
  cursor: pointer;
}

#controls-menu {
  --padding-x: 1vw;
  --padding-y: 1vh;
  position: absolute;
  background-color: var(--background-tertiary-color);
  width: 50vw;
  display: flex;
  flex-direction: column;
  padding: var(--padding-y) var(--padding-x);
  top: calc(25vh - var(--padding-x));
  left: calc(25vw - var(--padding-x));
  z-index: 100;
}

.category {
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
}

.control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1%;
  text-transform: none;
}

.control-name {
  display: flex;
  margin-left: 50px;
  width: 75%;
  align-content: stretch;
}

.control-key {
  margin-right: 75px;
  padding: 10px 30px;
  width: 10%;
  text-transform: capitalize;
}
</style>
