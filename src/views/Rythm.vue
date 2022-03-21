<template>
  <div id="rythm">
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

      <div id="keys">
        <div class="line" ref="line"></div>
        <div
          v-for="(color, c) in colors"
          :key="c"
          v-show="color.display"
          :class="c"
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
const colors = {
  red: {
    code: "KeyQ",
    display: false,
    notes: [],
  },
  blue: {
    code: "KeyW",
    display: false,
    notes: [],
  },
  green: {
    code: "KeyE",
    display: false,
    notes: [],
  },
  yellow: {
    code: "KeyO",
    display: false,
    notes: [],
  },
  purple: {
    code: "KeyP",
    display: false,
    notes: [],
  },
};

export default {
  name: "Rythm",

  data: function () {
    return {
      colors: {},
      notes: new Map(),
      maxNotes: 3,
      id: 0,
    };
  },

  created() {
    document.addEventListener("keydown", (event) => {
      for (const color in colors) {
        if (colors[color].code === event.code) {
          this.pressColor(color);
        }
      }
    });

    this.colors = colors;
    this.partition(60*1000);
  },

  methods: {
    pressColor(color) {
      if (!this.colors[color].display) {
        const lineRect = this.$refs.line.getBoundingClientRect();
        const lineRectY1 = lineRect.y;
        const lineRectY2 = lineRect.y + lineRect.height;

        const notes = document.getElementsByClassName("note " + color);

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
          }
        }

        // display key
        this.colors[color].display = true;
        setTimeout(() => {
          this.colors[color].display = false;
        }, 100);
      }
    },

    addNote(color) {
      // const key = performance.now();
      const key = this.id;
      this.id++;
      this.notes.set(key, color);
      setTimeout(() => {
        this.notes.delete(key);
      }, 4000);
    },

    partition(time) {
      const idInterval = setInterval(() => {
        let notesNumber = Math.ceil(Math.random() * this.maxNotes);
        while (notesNumber > 0) {
          const color = this.randomColor();
          this.addNote(color);
          --notesNumber;
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(idInterval);
      }, time)
    },

    randomColor() {
      const colors = Object.keys(this.colors);
      return colors[Math.floor(Math.random() * colors.length)];
    },
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