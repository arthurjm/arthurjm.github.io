<template>
  <span>Temps écoulé : {{ displayEllapsed }}</span>
</template>

<script>
import { formatTimeZero } from '@/js/time.js';

export default {
  name: 'Timer',

  props: ['timerStop'],

  emits: ['timer'],

  data: function() {
    return {
      intervalId: null,
      ellapsed: 0,
    }
  },

  created() {
    this.intervalId = setInterval(() => {
      if (this.timerStop) {
        clearInterval(this.intervalId);
      } else {
        this.ellapsed++;
        this.$emit('timer', this.ellapsed);
      }
    }, 1000)
  },

  beforeUnmount() {
    clearInterval(this.intervalId);
  },

  computed: {
    displayEllapsed() {
      const minutes = Math.floor(this.ellapsed / 60);
      const seconds = this.ellapsed % 60;
      
      return `${formatTimeZero(minutes)}:${formatTimeZero(seconds)}`;
    },
  }
}
</script>