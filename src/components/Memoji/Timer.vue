<template>
  <span>Temps écoulé : {{ displayEllapsed }}</span>
</template>

<script>
function formatTime(t) {
  return `${t > 9 ? t : '0' + t}`;
}


export default {
  name: 'Timer',
  props: ['timerStop'],
  data: function() {
    return {
      intervalId: null,
      ellapsed: 0,
    }
  },
  computed: {
    displayEllapsed() {
      const minutes = Math.floor(this.ellapsed / 60);
      const seconds = this.ellapsed % 60;
      
      return `${formatTime(minutes)}:${formatTime(seconds)}`;
    },
  },
  created() {
    this.intervalId = setInterval(() => {
      if (this.timerStop) {
        clearInterval(this.intervalId);
      } else {
        this.ellapsed++;
      }
    }, 1000)
  }
}
</script>

<style>
</style>