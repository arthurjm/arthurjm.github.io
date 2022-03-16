<template>
  <select :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    <option v-for="(difficulty, d) in difficultyNames" :key="d" :value="d">{{ difficulty }}</option>
  </select>
</template>

<script>
import { difficultyNames } from '@/js/memory.js';

export default {
  name: 'SelectDifficulty',

  props: ['modelValue'],

  emits: ['update:modelValue'],

  data: function () {
    return {
      difficultyNames: difficultyNames
    }
  },
}
</script>