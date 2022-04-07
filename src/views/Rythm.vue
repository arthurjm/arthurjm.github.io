<template>
  <Configuration v-if="!isOngoing" @launchGame="launchGame" :config="config" />
  <div v-else id="rythm">
    <div id="score" class="box">
      <p>Score : {{ score }}</p>
      <p>Multiplicateur : {{ multiplier }}</p>
    </div>
    <div id="game" ref="game">
      <div id="notes">
        <div
          v-for="[k, c] in notes"
          :key="k"
          :class="c"
          class="note"
          :data-key="k"
        ></div>
      </div>

      <div id="keys" ref="keys">
        <div
          v-for="(display, color) in colors"
          :key="color"
          class="key"
          @touchstart="pressColor(color)"
        >
          <div v-visibility="display"></div>
        </div>
      </div>
      <div class="line" ref="line"></div>

      <div id="separators">
        <div
          v-for="n in Object.keys(colors).length - 1"
          :key="n"
          class="separator"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Configuration from "@/components/Configuration.vue";

import { controlsHandler } from "@/js/controlsHandler.js";

export default {
  name: "Rythm",

  components: {
    Configuration,
  },

  data: function () {
    return {
      isOngoing: false,
      config: {
        time: {
          name: "Temps (en secondes)",
          choices: ["60", "120", "180"],
        },
      },
      colors: {
        red: false,
        blue: false,
        green: false,
        yellow: false,
        purple: false,
      },
      notes: new Map(),
      time: 0,
      maxNotes: 3,
      id: 0,
      score: 0,
      multiplier: 1,
      actions: {},
      keys: [],
      controlsHandler,
      partititionId: 0,
    };
  },

  created() {
    controlsHandler.addControl("rythm", "redBtn", {
      key: "a",
      function: this.pressColor,
      arguments: "red",
    });
    controlsHandler.addControl("rythm", "blueBtn", {
      key: "z",
      function: this.pressColor,
      arguments: "blue",
    });
    controlsHandler.addControl("rythm", "greenBtn", {
      key: "e",
      function: this.pressColor,
      arguments: "green",
    });
    controlsHandler.addControl("rythm", "yellowBtn", {
      key: "o",
      function: this.pressColor,
      arguments: "yellow",
    });
    controlsHandler.addControl("rythm", "purpleBtn", {
      key: "p",
      function: this.pressColor,
      arguments: "purple",
    });
  },

  beforeUnmount() {
    clearInterval(this.partititionId);
    controlsHandler.removeCategory("rythm");
  },

  methods: {
    launchGame(params) {
      this.time = params.time;
      this.isOngoing = true;
      this.partition(this.time * 1000);
    },

    pressColor(color) {
      if (!this.colors[color].display) {
        const lineRect = this.$refs.line.getBoundingClientRect();
        const lineRectY1 = lineRect.y;
        const lineRectY2 = lineRect.y + lineRect.height;

        const notes = document.getElementsByClassName("note " + color);

        let intersect = false;
        for (const note of notes) {
          const noteRect = note.getBoundingClientRect();
          const noteRectY1 = noteRect.y;
          const noteRectY2 = noteRect.y + noteRect.height;

          // if key intersect note
          if (
            !(
              (noteRectY2 < lineRectY1 && noteRectY2 < lineRectY2) ||
              (noteRectY1 > lineRectY1 && noteRectY1 > lineRectY2)
            )
          ) {
            const key = parseInt(note.dataset.key);
            this.notes.delete(key);
            intersect = true;
          }
        }

        this.updateScore(intersect);

        // display key
        this.colors[color] = true;
        setTimeout(() => {
          this.colors[color] = false;
        }, 100);
      }
    },

    addNote(color) {
      // const key = performance.now();
      const key = this.id;
      this.id++;
      this.notes.set(key, color);
      setTimeout(() => {
        if (this.notes.delete(key)) {
          this.updateScore(false);
        }
      }, 4000);
    },

    partition(time) {
      this.partititionId = setInterval(() => {
        let notesNumber = Math.ceil(Math.random() * this.maxNotes);
        while (notesNumber > 0) {
          const color = this.randomColor();
          this.addNote(color);
          --notesNumber;
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(this.partititionId);
      }, time);
    },

    randomColor() {
      const colors = Object.keys(this.colors);
      return colors[Math.floor(Math.random() * colors.length)];
    },

    updateScore(intersect) {
      if (intersect) {
        if (this.multiplier < 10) {
          this.multiplier++;
        }
        this.score += 10 * this.multiplier;
      } else {
        this.multiplier = 1;
        this.score -= 5;
      }
    },
  },
};
</script>

<style scoped>
#rythm {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#score {
  user-select: none;
  margin: 0 auto;
}

#score p {
  margin: 0;
}

@media screen and (max-height: 1000px) {
  #game {
    margin: auto;
  }
}

@media screen and (min-height: 1000px) {
  #game {
    margin: 1.5% auto;
  }
}

@media screen and (max-width: 600px) {
  #game {
    --game-width: 100%;
  }
}

@media screen and (min-width: 600px) {
  #game {
    --game-width: 500px;
  }
}

@media screen and (min-height: 1000px) and (min-width: 600px) {
  #game {
    padding: 0;
    border: solid 3px var(--border-primary-color);
    border-radius: 7px;
  }
}

#game {
  z-index: 0;
  --note-width: 20%;
  --note-height: 5%;
  --line-width: 1%;
  --game-height: 100%;
  position: relative;
  width: var(--game-width);
  height: var(--game-height);
  background-color: grey;
  user-select: none;
}

/* Notes */
.note {
  z-index: 1;
  position: absolute;
  width: var(--note-width);
  height: var(--note-height);
  animation: 4s linear 0s infinite drop;
}

@keyframes drop {
  from {
    top: 0;
  }
  to {
    top: calc(var(--game-height) - var(--note-height));
  }
}

/* Colors */
.red {
  background-color: red;
  left: calc((var(--note-width)) * 0);
}

.blue {
  background-color: blue;
  left: calc((var(--note-width)) * 1);
}

.green {
  background-color: green;
  left: calc((var(--note-width)) * 2);
}

.yellow {
  background-color: yellow;
  left: calc((var(--note-width)) * 3);
}

.purple {
  background-color: purple;
  left: calc((var(--note-width)) * 4);
}

/* Keys and line*/
#keys {
  display: flex;
  justify-content: space-evenly;
}

.line {
  z-index: 2;
  background-color: black;
}

.key > div,
.line {
  position: absolute;
  width: 100%;
  top: calc(var(--game-height) * 0.8);
  height: calc(var(--line-width) * 2);
}

#keys {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.key {
  z-index: 3;
  width: 100%;
}

.key > div {
  width: var(--note-width);
  background-color: white;
}

/* Separators */
#separators {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
}

.separator {
  z-index: 4;
  width: calc(var(--line-width) * 1.2);
  height: 100%;
  background-color: black;
}
</style>