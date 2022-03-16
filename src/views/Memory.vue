<template>
  <h1>Jeu de mémoire</h1>
  <GameConfiguration v-if="!isOngoing" @launchGame="launchGame" />
  <Game v-else :params="params" @reset="resetGame"/>
  <Scoreboard v-if="!isOngoing" />
</template>

<script>
import Game from '@/components/Memory/Game.vue';
import GameConfiguration from '@/components/Memory/GameConfiguration.vue';
import Scoreboard from '@/components/Memory/Scoreboard.vue';

export default {
  name: 'Memory',

  components: {
    Game, GameConfiguration, Scoreboard,
  },

  data: function () {
    return {
      isOngoing: false,
      params: {}
    }
  },

  methods: {
    launchGame(params) {
      this.isOngoing = true;
      this.params = params;
    },

    resetGame(){
      this.isOngoing = false;
    }
  },
};
</script>