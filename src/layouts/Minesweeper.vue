<template>
  <div class="container">
    <div v-for="j in difficulty.cols" :key="j" style="display:inline-block;line-height: 0;margin-top:0;">
      <div v-for="i in difficulty.rows" :key="i">
        <button v-if="!field[(i-1) * difficulty.rows + j-1].scoperto" class="button-grid coperto" :style="{ width: `${80/difficulty.cols}vw`, height: `${80/difficulty.cols}vw` }" @click="scopri(i-1, j-1)" v-touch-hold.mouse="toggleFlag(i, j)"></button>
        <button v-else-if="!field[(i-1) * difficulty.rows + j-1].mine" class="button-grid" :style="{ width: `${80/difficulty.cols}vw`, height: `${80/difficulty.cols}vw` }">
          {{ field[(i-1) * difficulty.rows + j-1].number == 0 ? "" : field[(i-1) * difficulty.rows + j-1].number }}
        </button>
        <button v-else-if="!field[(i-1) * difficulty.rows + j-1].flag" class="button-grid mine" :style="{ width: `${80/difficulty.cols}vw`, height: `${80/difficulty.cols}vw` }"></button>
        <button v-else class="button-grid flag" :style="{ width: `${80/difficulty.cols}vw`, height: `${80/difficulty.cols}vw` }"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      field: [],
      difficulty: {rows: 0, cols: 0, mines: 0}
    }
  },
  methods: {
    toggleFlag(i, j) {
      let index = i * this.difficulty.cols + j;
      let elem = this.field[index];
      if (!elem?.flag) return;
      elem.flag = !elem.flag;
    },
    getNeighbors(i, j) {
      let neighbors = [];
      for (let a = -1; a <= 1; a++) {
        for (let b = -1; b <= 1; b++) {
          if (i + a < 0 || j + b < 0 || i + a >= this.difficulty.rows || j + b >= this.difficulty.cols) continue;
          neighbors.push({i: i + a, j: j + b});
        }
      }
      return neighbors;
    },
    scopri(i, j) {
      let index = i * this.difficulty.cols + j;
      let elem = this.field[index];
      if (elem.scoperto || elem.flag) return;
      elem.scoperto = true;
      if (elem.number == 0) {
        for (let elem of this.getNeighbors(i, j)) {
          this.scopri(elem.i, elem.j);
        }
      }
    }
  },
  created() {
    const self = this;
    let difficulty = this.$store.state.DIFFICULTIES.filter(dif => dif.id == self.$route.params.difficultyId)[0];
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
    for (let i = 0; i < difficulty.rows; i++) {
      for (let j = 0; j < difficulty.cols; j++) {
        let index = i * difficulty.cols + j;
        if (tempField[index].mine) continue;
        let num = 0;
        for (let elem of this.getNeighbors(i, j)) {
          let ind = elem.i * difficulty.cols + elem.j;
          if (tempField[ind].mine)
            num++;
        }
        tempField[index].number = num;
      }
    }

    this.field = tempField;
  }
}
</script>

<style scoped>
.coperto {
  background-color: rgb(216, 216, 216);
}
.button-grid {
  border-radius: 0;
  border: 1px solid rgba(75, 75, 75, 0.26);
}
.button-grid.coperto:hover {
  background-color: rgb(168, 168, 168);
}
.mine {
  background-color: red;
}
.flag {
  background-color: lime;
}
</style>