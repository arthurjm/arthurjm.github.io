<template>
  <div id="main">
    <div id="actions" class="box">
      <label
        >Couleur<button @click="changeColor">
          <font-awesome-icon icon="dice" size="2x" />
        </button>
        <input type="range" name="hue" min="0" max="360" v-model="hue" />
      </label>
      <label
        >Largeur<input
          type="range"
          name="width"
          min="100"
          max="500"
          v-model="widthValue"
      /></label>
      <label
        >Hauteur<input
          type="range"
          name="height"
          min="100"
          max="500"
          v-model="heightValue"
      /></label>
      <label
        >Rotation<input
          type="range"
          name="height"
          min="0"
          max="360"
          v-model="angle"
      /></label>
    </div>
    <div class="rectangle"></div>
  </div>
</template>

<script>
export default {
  name: "css-demo",
  components: {},
  data: function () {
    return {
      hue: 0,
      widthValue: 250,
      heightValue: 250,
      angle: 0,
    };
  },
  methods: {
    changeColor() {
      this.hue = Math.floor(Math.random() * 360);
    },
  },
  computed: {
    color() {
      return `hsl(${this.hue}, 100%, 50%)`;
    },
    width() {
      return `${this.widthValue}px`;
    },
    height() {
      return `${this.heightValue}px`;
    },
    rotate() {
      return `rotate(${this.angle}deg)`;
    },
  },
};
</script>

<style lang="scss">
#actions {
  z-index: 1;
  position: relative;
  width: 300px;
}

label {
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rectangle {
  z-index: 0;
  margin: 1% auto;
  width: v-bind(width);
  height: v-bind(height);
  background-color: v-bind(color);
  transform: v-bind(rotate);
}
</style>
