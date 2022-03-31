<template>
    <div class="game">
        <h2 v-if="isGameOver" class="success">Victoire !</h2>
        <h2 v-else>Partie en cours</h2>
        <span>Nombre de coups : {{ actionsCount }}</span>
        <br />
        <Timer :timerStop="isGameOver" @timer="setTimer" />
        <table class="board">
            <tr v-for="(line, w) in board" :key="w">
                <td v-for="(cell, h) in line" :key="h" class="card" @click="flipCard" :w="w" :h="h">
                    <span v-if="cell.display">{{ cell.emoji }}</span>
                    <span v-else>❓</span>
                </td>
            </tr>
        </table>
        <button @click="resetGame">Recommencer</button>
    </div>
</template>

<script>
import Timer from '@/components/Memory/Timer.vue';

const boardSizes = {
    'Facile': [5, 4],
    'Intermédiaire': [6, 5],
    'Difficile': [7, 6],
};

const emojisList = [
    '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏',
    '🍐', '🍑', '🍒', '🍓', '🥝', '🍅', '🥥', '🥑', '🍆', '🥔',
    '🥕', '🌽', '🌶️', '🥒', '🥬', '🥦', '🧄', '🧅', '🍄', '🥜',
    '🌰', '🍞', '🥐', '🥖', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔',
    '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🧂', '🍙', '🍝', '🍦',
    '🍧', '🍨', '🍩', '🍪', '🎂', '🍫', '🍬', '🍭', '🥛', '☕'
];

export default {
    name: 'Game',

    props: ['params'],

    emits: ['reset'],

    components: {
        Timer,
    },

    data: function () {
        return {
            board: [],
            flipped: null,
            wait: false,
            actionsCount: 0,
            timer: 0,
            pairFound: 0,
            pairNb: 0,
        }
    },

    created() {
        const boardSize = boardSizes[this.params.difficulty];
        const nbElements = boardSize[0] * boardSize[1] / 2;
        this.pairNb = nbElements;

        let emojis = this.shuffle(emojisList).slice(0, nbElements);
        emojis = this.shuffle(emojis.concat(emojis)); // double elements

        for (let w = 0; w < boardSize[0]; ++w) {
            this.board[w] = [];
            for (let h = 0; h < boardSize[1]; ++h) {
                this.board[w][h] = {
                    emoji: emojis[w * (boardSize[0] - 1) + h],
                    display: false
                };
            }
        }
    },

    computed: {
        isGameOver() {
            if (this.pairFound === this.pairNb) {
                this.onGameOver();
                return true;
            }
            return false;
        },
    },

    methods: {
        // Fisher–Yates shuffle
        shuffle(arr) {
            let m = arr.length, t, i;

            while (m) {
                i = Math.floor(Math.random() * m--);

                t = arr[m];
                arr[m] = arr[i];
                arr[i] = t;
            }

            return arr;
        },

        flipCard(e) {
            let cell = this.board[e.currentTarget.getAttribute('w')][e.currentTarget.getAttribute('h')];
            if (cell.display === true || this.wait) return;

            cell.display = true;

            if (this.flipped) {
                this.actionsCount++;
                if (this.flipped.emoji === cell.emoji) {
                    this.flipped = null;
                    this.pairFound++;
                } else {
                    this.wait = true
                    setTimeout(() => {
                        cell.display = false;
                        this.flipped.display = false;
                        this.flipped = null;
                        this.wait = false;
                    }, 1000);
                }
            } else {
                this.flipped = cell
            }
        },

        resetGame() {
            this.$emit('reset');
        },

        setTimer(timer) {
            this.timer = timer;
        },

        onGameOver() {
            this.setScore();
        },

        setScore() {
            let value = localStorage.getItem('memory-score');
            let scores = (value && JSON.parse(value)) || {};

            const score = {
                time: this.timer,
                actions: this.actionsCount,
                date: Date()
            }

            const difficulty = this.params.difficulty;

            let arr = scores[difficulty] || []

            arr.push(score);
            arr.sort(function (a, b) {
                if (a.time === b.time) {
                    return a.actions - b.actions;
                }
                return a.time - b.time;
            });

            scores[difficulty] = arr.slice(0, 10);

            localStorage.setItem('memory-score', JSON.stringify(scores));
        }
    },
};
</script>

<style scoped>
.game {
    user-select: none;
    touch-action: manipulation;
}

.board {
    padding: 5px;
    margin-left: auto;
    margin-right: auto;
    border-spacing: 4px;
    border-collapse: separate;
}

.card {
    cursor: pointer;
    border: 1px solid var(--border-primary-color);
    padding: 2px;
    background-color: var(--background-secondary-color);
    width: 35px;
    height: 35px;
}

.success {
    color: var(--success-color);
}
</style>