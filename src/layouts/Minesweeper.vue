<template>
  <div class="container">
    <div class="header">
      <label>Mine rimanenti: {{ difficulty.mines - flagged }}</label>
      <q-btn @click="flagMode = !flagMode">Flag: {{ flagMode ? "On" : "Off" }}</q-btn>
    </div>
    <div align="center">
      <div class="field" id="field">
        <div v-for="index in (difficulty.cols * difficulty.rows)" :key="index">
          <button v-if="field[index - 1].flag" class="button-grid flag" @click="premi(index - 1)"></button>
          <button v-else-if="!field[index - 1].scoperto" class="button-grid coperto" @click="premi(index - 1)"></button>
          <button v-else-if="!field[index - 1].mine" class="button-grid">
            {{ field[index - 1].number == 0 ? "" : field[index - 1].number }}
          </button>
          <button v-else class="button-grid mine"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      field: [],
      difficulty: {rows: 0, cols: 0, mines: 0},
      flagMode: false,
      flagged: 0
    }
  },
  methods: {
    toggleFlag(index) {
      let elem = this.field[index];
      elem.flag = !elem.flag;
      if (elem.flag) this.flagged++;
      else this.flagged--;
    },
    getNeighbors(index) {
      const i = parseInt(index / this.difficulty.cols), j = index % this.difficulty.cols;
      let neighbors = [];
      for (let a = -1; a <= 1; a++) {
        for (let b = -1; b <= 1; b++) {
          if ((i + a) < 0 || (j + b) < 0 || (i + a) >= this.difficulty.rows || (j + b) >= this.difficulty.cols) continue;
          neighbors.push((i + a) * this.difficulty.cols + (j + b));
        }
      }
      return neighbors;
    },
    premi(index) {
      if (this.flagMode)
        this.toggleFlag(index);
      else
        this.scopri(index);
    },
    scopri(index) {
      let elem = this.field[index];
      if (elem.scoperto || elem.flag) return;
      elem.scoperto = true;
      if (elem.number == 0) {
        for (let ind of this.getNeighbors(index)) {
          this.scopri(ind);
        }
      }
    }
  },
  created() {
    const self = this;
    let difficulty = this.$store.state.DIFFICULTIES.filter(dif => dif.id == self.$route.params.difficultyId)[0];
    console.log(difficulty)
    this.difficulty = difficulty;
    let mines = difficulty.mines;

    let tempField = [];

    for (let i = 0; i < difficulty.rows; i++) {
      for (let j = 0; j < difficulty.cols; j++) {
        if (mines) {
          tempField.push({ mine: true, number: undefined, scoperto: false, flag: false });
          mines--;
        } else
          tempField.push({ mine: false, number: -1, scoperto: false, flag: false });
      }
    }

    tempField.sort(() => (Math.random() > .5) ? 1 : -1);

    // Imposto numeri in base alle mine
    for (let index = 0; index < (difficulty.rows * difficulty.cols); index++) {
      if (tempField[index].mine) continue;
      const num = this.getNeighbors(index).filter(ind => tempField[ind].mine).length;
      tempField[index].number = num;
    }

    this.field = tempField;
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1vh;
}
.field {
  --cols: v-bind(difficulty.cols);
  --rows: v-bind(difficulty.rows);
  --field-dim: min(80vh, 80vw);

  font-size: calc(18em / var(--cols));
  width: var(--field-dim);
  height: calc(var(--field-dim) * var(--rows) / var(--cols));
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
  gap: 0;
  vertical-align: middle;
}
.coperto {
  background-color: rgb(216, 216, 216);
}
.button-grid {
  border-radius: 0;
  border: 1px solid rgba(75, 75, 75, 0.26);
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.button-grid.coperto:hover, .button-grid.flag:hover {
  background-color: rgb(168, 168, 168);
}
.mine {
  background-color: red;
  background-image: url("../assets/images/mine.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.flag {
  background-color: rgb(216, 216, 216);
  background-image: url("../assets/images/flag.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>