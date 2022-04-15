<template>
  <div id="demo">
    <ControlPanel :data="controls" />
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
import ControlPanel from "@/components/ControlPanel/ControlPanel.vue";

export default {
  name: "firework-demo",

  components: {
    ControlPanel,
  },

  data: function () {
    return {
      id: 0,
      fireworks: new Map(),

      controls: [
        {
          name: "Général",
          content: [
            {
              name: "Intervalle d'apparition",
              type: "InputRange",
              min: 100,
              max: 1000,
              step: 1,
              value: 300,
              unit: "ms",
            },
          ],
        },
        {
          name: "Animations",
          content: [
            {
              name: "Bang duration",
              type: "InputRange",
              min: 0.1,
              max: 2,
              step: 0.1,
              value: 1,
              unit: "s",
            },
            {
              name: "Bang delay",
              type: "InputRange",
              min: 0.1,
              max: 2,
              step: 0.1,
              value: 1,
              unit: "s",
            },
            {
              name: "Gravity duration",
              type: "InputRange",
              min: 0.1,
              max: 2,
              step: 0.1,
              value: 1,
              unit: "s",
            },
            {
              name: "Gravity delay",
              type: "InputRange",
              min: 0.1,
              max: 2,
              step: 0.1,
              value: 1,
              unit: "s",
            },
          ],
        },
      ],
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
        "animation-duration": this.animationDuration,
        "animation-delay": this.animationDelay,
      });
      setTimeout(() => {
        this.fireworks.delete(key);
      }, time);
    },

    interval() {
      const time = this.fireworksInterval;
      const intervalId = setInterval(() => {
        this.addFirework();
        if (time !== this.fireworksInterval) {
          clearInterval(intervalId);
          this.interval();
        }
      }, this.fireworksInterval);
    },
  },

  computed: {
    animationDuration() {
      const bangDuration = this.controls[1].content[0].value;
      const gravityDuration = this.controls[1].content[2].value;
      return `${bangDuration}s, ${gravityDuration}s`;
    },

    animationDelay() {
      const bangDuration = this.controls[1].content[1].value;
      const gravityDuration = this.controls[1].content[3].value;
      return `${bangDuration}s, ${gravityDuration}s`;
    },

    fireworksInterval() {
      return this.controls[0].content[0].value;
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
