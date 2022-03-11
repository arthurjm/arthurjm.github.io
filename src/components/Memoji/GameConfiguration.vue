<template>
    <h2>Configurer la partie</h2>
    <SelectDifficulty v-model="difficulty"/>
    <button @click="launchGame">Valider</button>
</template>

<script>
import SelectDifficulty from '@/components/Memoji/SelectDifficulty.vue';

export default {
    name: 'GameConfiguration',
    emits: ['launchGame'],
    components: {
        SelectDifficulty,
    },
    data: function () {
        return {
            difficulty: 1,
        }
    },
    methods: {
        launchGame() {
            this.$emit('launchGame', {
                difficulty: this.difficulty
            })
        }
    },
};
</script>

<style>
</style>