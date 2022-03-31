<template>
  <div id="header">
    <div id="home">
      <router-link :to="'/'">
        <font-awesome-icon icon="home" size="2x" />
      </router-link>
    </div>
    <Controls />
    <ThemeButton />
  </div>
</template>

<script>
import ThemeButton from "@/components/Header/ThemeButton.vue";

import Controls from "@/components/Controls.vue";

export default {
  name: "Header",

  components: {
    ThemeButton,
    Controls,
  },
};
</script>

<style scoped>
#header {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  margin: 8px;
  width: -webkit-fill-available;
}

#home {
  margin-right: auto;
}

a {
  color: var(--text-primary-color);
}
</style>