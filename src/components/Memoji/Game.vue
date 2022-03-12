<template>
    <div class="game">
        <h2 v-if="isGameOver" class="success">Victoire !</h2>
        <h2 v-else>Partie en cours</h2>
        <span>Nombre de coups : {{ actionsCount }}</span>
        <br>
        <Timer :timerStop="isGameOver"/>
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
import Timer from '@/components/Memoji/Timer.vue';

const boardSizes = {
  
    1: [5, 4],
    2: [6, 5],
    3: [7, 6],
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
            pairFound: 0,
            pairNb: 0,
            start: null,
        }
    },
    computed: {
      isGameOver() {
        return this.pairFound === this.pairNb;
      }
    },
    methods: {
        // Fisher–Yates shuffle
        // Source : https://bost.ocks.org/mike/shuffle/
        shuffle(arr) {
            let m = arr.length, t, i;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
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
        resetGame(){
          console.log('reset game')
          this.$emit('reset')
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
        this.start = new Date()
    }
};
</script>

<style>
.game {
    user-select: none;
}

.board {
    margin-left: auto;
    margin-right: auto;
}

.card {
    cursor: pointer;
    border: 1px solid #333;
    width: 35px;
    height: 35px;
}

.success {
  color: green;
}
</style>