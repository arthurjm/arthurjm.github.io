<template>
  <h1>Jeu de mémoire</h1>
  <GameConfiguration v-if="!isOngoing" @launchGame="launchGame" />
  <Game v-if="isOngoing" :params="params" />
</template>

<script>
import GameConfiguration from '@/components/Memory/GameConfiguration.vue';
import Game from '@/components/Memory/Game.vue';

export default {
  name: 'Memory',
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