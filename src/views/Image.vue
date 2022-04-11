<template>
  <div id="image-vue">
    <div v-show="file" id="editor">
      <canvas
        ref="canvas"
        width="1000"
        height="1000"
        @mousedown="startMove"
        @mousemove="mousemove"
        @mousewheel="updateZoom"
      ></canvas>
      <div id="buttons">
        <button @click="removeFile">
          <font-awesome-icon icon="trash-can" size="2x" />
        </button>
        <button @click="rotate(90)">
          <font-awesome-icon icon="rotate-right" size="2x" />
        </button>
        <button @click="rotate(-90)">
          <font-awesome-icon icon="rotate-left" size="2x" />
        </button>
        <button @click="updateZoom(1)">
          <font-awesome-icon icon="plus" size="2x" />
        </button>
        <button @click="updateZoom(-1)">
          <font-awesome-icon icon="minus" size="2x" />
        </button>
      </div>
    </div>

    <div
      v-show="!file"
      id="open-image"
      @drop="drop"
      @dragover="dragOver"
      @dragleave="dragLeave"
      @drag="true"
      :class="{ 'drag-over': isOver }"
      class="box"
    >
      <label for="input-image" class="button">Ouvrir un fichier</label>
      <input
        id="input-image"
        ref="input-image"
        type="file"
        accept="image/*"
        @change="inputChange"
      />
      <span>ou</span>
      <div>
        Déposer un fichier ici <font-awesome-icon icon="file-arrow-down" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "image-view",

  components: {},

  data: function () {
    return {
      isOver: false,
      isDrag: false,

      file: undefined,
      img: undefined,
      ctx: undefined,
      canvas: undefined,

      pos: {
        x: 0,
        y: 0,
      },
      zoom: 1,
      angle: 0,

      move: false,
    };
  },

  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.img = document.createElement("img");

    this.pos.x = Math.round(this.canvas.width / 2);
    this.pos.y = Math.round(this.canvas.height / 2);

    document.addEventListener("mouseup", this.stopeMove);
  },

  beforeUnmount() {
    document.removeEventListener("mouseup", this.stopeMove);
  },

  methods: {
    dragOver(event) {
      event.preventDefault();
      event.stopPropagation();

      this.isOver = true;
      this.isDrag = false;
    },

    dragLeave(event) {
      event.preventDefault();
      event.stopPropagation();

      this.isOver = false;
      this.isDrag = false;
    },

    drop(event) {
      event.preventDefault();
      event.stopPropagation();

      if (event.dataTransfer.files.length > 0) {
        this.loadFile(event.dataTransfer.files[0]);
      }

      this.isOver = false;
      this.isDrag = false;
    },

    inputChange() {
      if (this.$refs["input-image"].files.length > 0) {
        this.loadFile(this.$refs["input-image"].files[0]);
      }

      this.$refs["input-image"].value = [];
    },

    loadFile(file) {
      this.file = file;
      this.zoom = 1;
      this.pos = {
        x: 0,
        y: 0,
      };

      var imageType = /image.*/;
      if (!file.type.match(imageType)) {
        return;
      }

      this.img.file = file;
      var reader = new FileReader();

      reader.addEventListener("load", (event) => {
        this.img.src = event.target.result;
      });

      this.img.addEventListener("load", () => {
        this.render();
      });

      reader.readAsDataURL(file);
    },

    removeFile() {
      this.file = undefined;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    render() {
      let img = this.img;
      let canvas = this.canvas;
      let ctx = this.ctx;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let ratio = {
        x: canvas.width / img.width,
        y: canvas.height / img.height,
      };
      ratio = Math.min(ratio.x, ratio.y) * this.zoom;

      let rad = (this.angle * Math.PI) / 180;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.translate(this.pos.x, this.pos.y);
      ctx.rotate(rad);
      // -canvas.width / 2 : annule premier translate
      // (canvas.width - img.width * ratio) / 2 : centre image
      // (-canvas.width / 2) + ((canvas.width - img.width * ratio) / 2) = -img.width * ratio / 2
      ctx.translate((-img.width * ratio) / 2, (-img.height * ratio) / 2);
      ctx.scale(ratio, ratio);

      ctx.drawImage(img, 0, 0);
    },

    startMove() {
      this.move = true;
    },

    stopeMove() {
      this.move = false;
    },

    mousemove(event) {
      if (this.move) {
        this.pos.x += event.movementX;
        this.pos.y += event.movementY;
        this.render();
      }
    },

    rotate(angle) {
      this.angle = (this.angle + angle) % 360;
      this.render();
    },

    updateZoom(e) {
      let sign = Math.sign(-e.deltaY) || e;
      let zoom = Math.max(this.zoom + 0.1 * sign, 0.1);
      zoom = Math.min(zoom, 2.0);
      this.zoom = zoom;
      this.render();
    },
  },
};
</script>

<style lang="scss">
#image-vue {
  position: relative;
}

.drag-over {
  background-color: var(--success-color) !important;
}

#open-image > * {
  width: fit-content;
  margin: 3px auto;
}

#drop-text {
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  align-items: center;
}

#buttons {
  display: flex;
  position: absolute;
  top: 0;
  flex-direction: column;
  background-color: var(--background-secondary-color);
  border: 1px solid var(--border-primary-color);
  padding: 4px;
}

#buttons > * {
  margin: 2px;
  cursor: pointer;
}

input[type="file"] {
  display: none;
}
</style>
