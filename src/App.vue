<template>
  <Header />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import { controlsHandler } from "@/js/controlsHandler.js";

export default {
  name: "App",

  components: {
    Header,
  },

  data: function () {
    return {
      controlsHandler,
    };
  },

  mounted() {
    document.addEventListener("keydown", this.keydown);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.keydown);
  },

  methods: {
    keydown(event) {
      controlsHandler.event(event.key);
    },
  },
};
</script>

<style>
:root {
  --element-size: 4rem;
  --text-link-color: #366fd1;
  --success-color: green;
}

:root.light-theme {
  --text-primary-color: #222;
  --background-primary-color: #ebebeb;
  --background-secondary-color: #fafafa;
  --background-tertiary-color: #bdbdbd;
  --border-primary-color: #333;
  --button-background-color: #61a5ff;
  --accent-color: #cacaca;
}

:root.dark-theme {
  --text-primary-color: #ddd;
  --background-primary-color: #1e1e1e;
  --background-secondary-color: #2d2d30;
  --background-tertiary-color: #4d4d4d;
  --border-primary-color: #d6d6d6;
  --button-background-color: #215292;
  --accent-color: #3f3f3f;
}

body {
  background-color: var(--background-primary-color);
  color: var(--text-primary-color);
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.button {
  color: var(--text-primary-color);
  background-color: var(--button-background-color);
  border: 2px solid var(--border-primary-color);
  padding: 10px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  width: fit-content;
}

.box {
  --box-margin-horizontal: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--box-margin-horizontal) auto;
  padding: 1%;
  border: 3px solid var(--border-primary-color);
  background-color: var(--background-secondary-color);
}

@media screen and (max-width: 600px) {
  .box {
    width: calc(100% - calc(var(--box-margin-horizontal) * 2));
  }
}

@media screen and (min-width: 600px) {
  .box {
    width: 500px;
  }
}
</style>
