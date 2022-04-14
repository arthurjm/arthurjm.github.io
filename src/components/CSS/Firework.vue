<template>
  <div id="demo">
    <div v-if="false" id="actions" class="box">
      <!-- <div><a href="https://codepen.io/hmaw/pen/qBEMLxV">Lien</a></div> -->
      <!-- <label
        >Nombre de particules<input
          type="range"
          name="particles"
          min="10"
          max="100"
          v-model="particles"
      /></label> -->
    </div>
    <div id="display">
      <div
        v-for="[k, t] in fireworks"
        :key="k"
        class="firework"
        :style="t"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "firework-demo",

  data: function () {
    return {
      id: 0,
      fireworks: new Map(),
      particles: 50,
    };
  },

  mounted() {
    setInterval(() => {
      this.addFirework();
    }, 300);
  },

  methods: {
    addFirework() {
      const key = this.id++;
      const time = 500 + Math.floor(Math.random() * 800);
      const top = Math.floor(Math.random() * 25 + 25);
      const left = Math.floor(Math.random() * 70 + 15);
      this.fireworks.set(key, {
        top: `${top}%`,
        left: `${left}%`,
        "animation-duration": `${(time / 1000).toFixed(1)}s`,
      });
      setTimeout(() => {
        this.fireworks.delete(key);
      }, time);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:math";

@mixin keyframes($animationName) {
  @-webkit-keyframes #{$animationName} {
    @content;
  }

  @-moz-keyframes #{$animationName} {
    @content;
  }

  @-o-keyframes #{$animationName} {
    @content;
  }

  @-ms-keyframes #{$animationName} {
    @content;
  }

  @keyframes #{$animationName} {
    @content;
  }
}

@mixin animation($settings) {
  animation: $settings;
  -moz-animation: $settings;
  -webkit-animation: $settings;
  -ms-animation: $settings;
  -o-animation: $settings;
}

@mixin transform($settings) {
  transform: $settings;
  -moz-transform: $settings;
  -webkit-transform: $settings;
  -ms-transform: $settings;
  -o-transform: $settings;
}

#demo {
  height: 100%;
  overflow: hidden;
  position: relative;
}

#actions {
  z-index: 1;
  position: relative;
  width: 300px;
  margin: 1% auto;
}

label {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#display {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: black;
  user-select: none;
}

$radius: 150;
$particles: 50;
$width: 500;
$height: 500;

// Create the explosion...
$box-shadow-color: ();
$box-shadow-white: ();

@for $i from 0 through $particles {
  $r: $radius * math.sqrt(math.random());
  $theta: math.random() * 2 * math.$pi;

  $box-shadow-color: $box-shadow-color,
    ($r * math.cos($theta)) +
      px
      ($r * math.sin($theta)) +
      px
      hsl(random(360), 100, 50);

  $box-shadow-white: $box-shadow-white, 0 0 #fff;
}

.firework {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: $box-shadow-white;
  @include animation((bang ease-out 1 forwards, gravity ease-in 1 forwards));
}

@include keyframes(bang) {
  to {
    box-shadow: $box-shadow-color;
  }
}

@include keyframes(gravity) {
  to {
    opacity: 0;
    @include transform(translateY(250px));
  }
}
</style>
