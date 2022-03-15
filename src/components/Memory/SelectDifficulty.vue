<template>
  <select :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    <option value="1" selected>Facile</option>
    <option value="2">Intermédiaire</option>
    <option value="3">Difficile</option>
  </select>
</template>

<script>
export default {
  name: 'SelectDifficulty',

  props: ['modelValue'],
  
  emits: ['update:modelValue']
}
</script>