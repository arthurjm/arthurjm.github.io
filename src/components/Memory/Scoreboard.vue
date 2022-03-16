<template>
    <div id="scoreboard">
        <h2>Tableau de scores</h2>
        <div v-for="(difficulty, d) in difficultyNames" :key="d">
            <h3>{{ difficulty }} :</h3>
            <span v-if="!score[d]">Pas de score pour l'instant</span>
            <table v-else>
                <thead>
                    <tr>
                        <th>Temps (secondes)</th>
                        <th>Nombre de coups</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(score, s) in score[d]" :key="s">
                        <td>{{ score.time }}</td>
                        <td>{{ score.actions }}</td>
                        <td>{{ formatDate(new Date(score.date)) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { difficultyNames } from '@/js/memory.js';
import { formatDate } from '@/js/time.js';

export default {
    name: 'Scoreboard',

    data: function () {
        return {
            score: {},
            difficultyNames: difficultyNames
        }
    },

    created() {
        const values = localStorage.getItem('memory-score');
        this.score = (values && JSON.parse(values)) || {};
    },

    methods: {
        formatDate(date) {
            return formatDate(date);
        }
    }
}
</script>

<style scoped>
table {
    margin: auto;
}

table,
td,
th {
    border: 1px solid var(--border-primary-color);
}

th {
    padding: 10px;
}

thead,
tfoot {
    background-color: var(--background-tertiary-color);
    color: var(--text-primary-color);
}

td {
    background-color: var(--background-secondary-color);
}
</style>