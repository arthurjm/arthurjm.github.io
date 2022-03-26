<template>
  <div id="rythm">
    <div id="score">
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

      <div id="keys" ref="keys" tabindex="0">
        <div class="line" ref="line"></div>
        <div
          v-for="(display, color) in colors"
          :key="color"
          v-show="display"
          :class="color"
          class="key"
        ></div>
      </div>

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
import { controlsHandler } from "@/js/controlsHandler.js";

export default {
  name: "Rythm",

  data: function () {
    return {
      colors: {
        red: false,
        blue: false,
        green: false,
        yellow: false,
        purple: false
      },
      notes: new Map(),
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
    controlsHandler.addControl('rythm', 'redBtn', {key: 'a', function: this.pressColor, arguments: 'red'});
    controlsHandler.addControl('rythm', 'blueBtn', {key: 'z', function: this.pressColor, arguments: 'blue'});
    controlsHandler.addControl('rythm', 'greenBtn', {key: 'e', function: this.pressColor, arguments: 'green'});
    controlsHandler.addControl('rythm', 'yellowBtn', {key: 'o', function: this.pressColor, arguments: 'yellow'});
    controlsHandler.addControl('rythm', 'purpleBtn', {key: 'p', function: this.pressColor, arguments: 'purple'});

    this.partition(60 * 1000);
  },

  beforeUnmount() {
    clearInterval(this.partititionId);
    controlsHandler.removeCategory('rythm');
  },

  methods: {
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
#game {
  --note-width: 100px;
  --note-height: 50px;
  --line-width: 5px;
  --game-width: calc(var(--note-width) * 5 + var(--line-width) * 4);
  --game-height: 1000px;

  margin: auto;
  width: var(--game-width);
  height: var(--game-height);
  background-color: grey;
  border: solid var(--line-width) black;
  padding: 0;
  position: relative;
  z-index: 0;
  user-select: none;
}

/* Separators */
#separators {
  display: flex;
}

#separators > .separator {
  position: relative;
  margin-left: var(--note-width);
}

.separator {
  position: absolute;
  width: var(--line-width);
  height: var(--game-height);
  background-color: black;
  z-index: 2;
}

/* Colors */
.red {
  background-color: red;
  left: calc((var(--note-width) + var(--line-width)) * 0);
}

.blue {
  background-color: blue;
  left: calc((var(--note-width) + var(--line-width)) * 1);
}

.green {
  background-color: green;
  left: calc((var(--note-width) + var(--line-width)) * 2);
}

.yellow {
  background-color: yellow;
  left: calc((var(--note-width) + var(--line-width)) * 3);
}

.purple {
  background-color: purple;
  left: calc((var(--note-width) + var(--line-width)) * 4);
}

/* Notes */
#notes {
  position: relative;
}

.note {
  position: absolute;
  width: var(--note-width);
  height: var(--note-height);
  z-index: 1;
  animation: 4s linear 0s infinite drop;
}

/* Keys */
#keys {
  position: relative;
}

.line,
.key {
  position: absolute;
  top: calc(var(--game-height) * 0.85);
  height: calc(var(--line-width) * 3);
}

.line {
  width: var(--game-width);
  background-color: black;
  z-index: 2;
}

.key {
  width: var(--note-width);
  background-color: white;
  z-index: 3;
}

@keyframes drop {
  from {
    top: 0;
  }
  to {
    top: calc(var(--game-height) - var(--note-height));
  }
}
</style>