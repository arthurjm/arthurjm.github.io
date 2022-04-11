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
  name: "header-component",

  components: {
    ThemeButton,
    Controls,
  },
};
</script>

<style lang="scss" scoped>
#header {
  --header-margin: 8px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  margin: var(--header-margin);
  width: calc(100% - calc(var(--header-margin) * 2));
  height: calc(2vh + var(--header-margin) * 2);
}

#home {
  margin-right: auto;
}

#header a {
  color: var(--text-primary-color);
}
</style>
