<template>
  <router-link :to="{ name: link.url }">
    <div class="card">
      <div class="devices">
        <div class="device-icon" title="Ordinateur">
          <font-awesome-icon v-if="link.desktop" icon="desktop" size="2x" />
        </div>
        <div class="device-icon" title="Téléphone">
          <font-awesome-icon
            v-if="link.mobile"
            icon="mobile-screen-button"
            size="2x"
            class="device-icon"
          />
        </div>
      </div>
      <div class="title">
        <p>{{ link.name }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "PageLink",

  props: ["link"],

  components: {},

  data: function () {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
a {
  color: var(--text-primary-color);
  text-decoration: none;
}

.card {
  --card-width: 300px;
  --card-height: 150px;
  position: relative;
  width: var(--card-width);
  height: var(--card-height);
  background-color: var(--background-secondary-color);
  border: 1px solid var(--border-primary-color);
}

.card:hover {
  background-color: var(--button-background-color);
  animation-name: hover;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

@keyframes hover {
  from {
    width: var(--card-width);
    height: var(--card-height);
  }

  to {
    width: calc(var(--card-width) * 1.07);
    height: calc(var(--card-height) * 1.07);
  }
}

.devices {
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  right: 0%;
  padding: 5px;
  margin: 5px;
}

.device-icon {
  margin-left: 10%;
}

.title {
  width: 100%;
  padding: calc(var(--card-height) / 3) 0;
}
</style>