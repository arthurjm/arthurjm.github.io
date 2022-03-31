<template>
  <h1>Jeu de mémoire</h1>
  <Configuration v-if="!isOngoing" @launchGame="launchGame" :config="config" />
  <Game v-else :params="params" @reset="resetGame" />
  <Scoreboard v-if="!isOngoing" />
</template>

<script>
import Configuration from "@/components/Configuration.vue";
import Game from "@/components/Memory/Game.vue";
import Scoreboard from "@/components/Memory/Scoreboard.vue";

export default {
  name: "Memory",

  components: {
    Game,
    Configuration,
    Scoreboard,
  },

  data: function () {
    return {
      isOngoing: false,
      config: {
        difficulty: {
          name: "Difficulté",
          choices: ["Facile", "Intermédiaire", "Difficile"],
        },
      },
      params: {},
    };
  },

  methods: {
    launchGame(params) {
      this.isOngoing = true;
      this.params = params;
    },

    resetGame() {
      this.isOngoing = false;
    },
  },
};
</script>