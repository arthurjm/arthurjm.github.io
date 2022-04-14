<template>
  <div id="demo">
    <div v-if="true" id="actions" class="box">
      <label v-if="false"
        >Nombre de particules<input
          type="range"
          name="particles"
          min="10"
          max="100"
          v-model="particles"
      /></label>

      <label
        >Intervale d'apparition<input
          type="range"
          min="100"
          max="1000"
          v-model.number="time"
      /></label>

      <div>Animations :</div>
      <div v-for="(animation, i) in animations" :key="i">
        <p>{{ i.charAt(0).toUpperCase() + i.slice(1) }}</p>

        <label v-for="(property, p) in animation" :key="p"
          >{{ p.charAt(0).toUpperCase() + p.slice(1) }} ({{ property }})<input
            type="range"
            min="0"
            max="2"
            step="0.1"
            v-model="animation[p]"
        /></label>
      </div>
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
      time: 300,
      animations: {
        bang: {
          duration: 1,
          delay: 1,
        },
        gravity: {
          duration: 1,
          delay: 1,
        },
      },
    };
  },

  mounted() {
    this.interval();
  },

  methods: {
    addFirework() {
      const key = this.id++;
      // const time = 500 + Math.floor(Math.random() * 800);
      const time = 5000;
      const top = Math.floor(Math.random() * 25 + 25);
      const left = Math.floor(Math.random() * 70 + 15);
      this.fireworks.set(key, {
        top: `${top}%`,
        left: `${left}%`,
        "animation-duration": `${this.animations.bang.duration}s, ${this.animations.gravity.duration}s`,
        "animation-delay": `${this.animations.bang.delay}s, ${this.animations.gravity.delay}s`,
      });
      setTimeout(() => {
        this.fireworks.delete(key);
      }, time);
    },

    interval() {
      const time = this.time;
      const intervalId = setInterval(() => {
        this.addFirework();
        if (time !== this.time) {
          clearInterval(intervalId);
          this.interval();
        }
      }, this.time);
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
  width: 400px;
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

$radius: 200;
$particles: 100;
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
