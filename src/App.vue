<template>
    <ThemeButton />
    <router-view></router-view>
</template>

<script>
import ThemeButton from '@/components/ThemeButton.vue';

export default {
  name: 'App',
  components: {
    ThemeButton,
  },
}
</script>

<style>
/* Define styles for the default root window element */
:root {
  --background-color-primary: #ebebeb;
  --background-color-secondary: #fafafa;
  --border-color-primary: #333;
  --accent-color: #cacaca;
  --text-primary-color: #222;
  --text-link-color: #366fd1;
  --element-size: 4rem;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --background-color-primary: #1e1e1e;
  --background-color-secondary: #2d2d30;
  --border-color-primary: #ebebeb;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
  --text-link-color: #366fd1;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  background-color: var(--background-color-primary);
}

.light-theme {
  color: #2c3e50;
}

.dark-theme {
  color: #fff;
}
</style>
