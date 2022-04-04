<template>
  <div id="configuration" class="box">
    <h2>Configurer la partie</h2>
    <div id="parameters">
      <div v-for="(option, o) in this.config" :key="o" class="parameter">
        <label :for="o">{{ option.name }} :</label>
        <select :id="o" v-model="selected[o]">
          <option
            v-for="(choice, c) in option.choices"
            :key="c"
            :value="choice"
          >
            {{ choice }}
          </option>
        </select>
      </div>
    </div>
    <button @click="launchGame" class="button">Valider</button>
  </div>
</template>

<script>
export default {
  name: "Configuration",

  props: ["config"],

  emits: ["launchGame"],

  data: function () {
    return {
      selected: {},
    };
  },

  mounted() {
    for (const i in this.config) {
      this.selected[i] = this.config[i].choices[0];
    }
  },

  methods: {
    launchGame() {
      this.$emit("launchGame", this.selected);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0;
}

#parameters {
  width: 100%;
  margin: 1% 0;
}

.parameter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  margin-bottom: 2%;
  margin: 2% auto;
}

select {
  padding: 5px;
  user-select: none;
}
</style>