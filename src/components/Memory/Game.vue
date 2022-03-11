<template>
    <div class="game">
        <h2>Partie</h2>
        <table class="board">
            <tr v-for="(line, w) in board" :key="w">
                <td v-for="(cell, h) in line" :key="h" class="card" @click="flipCard" :w="w" :h="h">
                    <span v-if="cell.display">{{ cell.emoji }}</span>
                    <span v-else>?</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
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
    components: {
    },
    data: function () {
        return {
            board: [],
            flipped: null,
            wait: false,
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
                if (this.flipped.emoji === cell.emoji) {
                    this.flipped = null;
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
        }
    },
    created() {
        const boardSize = boardSizes[this.params.difficulty];
        const nbElements = boardSize[0] * boardSize[1] / 2;

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
    width: 30px;
    height: 30px;
}
</style>