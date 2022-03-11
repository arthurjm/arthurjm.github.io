<template>
  <h1>Jeu de mémoire</h1>
  <GameConfiguration v-if="!isOngoing" @launchGame="launchGame" />
  <Game v-if="isOngoing" :params="params" />
</template>

<script>
import GameConfiguration from '@/components/Memoji/GameConfiguration.vue';
import Game from '@/components/Memoji/Game.vue';

export default {
  name: 'Memoji',
  components: {
    GameConfiguration, Game,
  },
  data: function () {
    return {
      isOngoing: false,
      params: {}
    }
  },
  methods: {
    launchGame(params) {
      this.isOngoing = true
      this.params = params
    }
  },
};
</script>

<style>
</style>