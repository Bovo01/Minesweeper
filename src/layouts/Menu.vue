<template>
  <div class="container">
    <h3>MINESWEEPER</h3>

    <q-btn class="btn-center" outline rounded style="width: 25vw; " color="positive" label="Play">
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item v-for="difficulty in DIFFICULTIES" :key="difficulty.id" clickable v-close-popup @click="play(difficulty.id)">
            <q-item-section>
              <q-item-label>{{difficulty.name}}</q-item-label>
              <q-item-label caption>{{difficulty.rows}}x{{difficulty.cols}} {{difficulty.mines}} mines</q-item-label>
            </q-item-section>
          </q-item>
          <!--
          <q-item clickable v-close-popup @click="play(1)">
            <q-item-section>
              <q-item-label>Medium</q-item-label>
              <q-item-label caption>16x16 40 mines</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="play(2)">
            <q-item-section>
              <q-item-label>Advanced</q-item-label>
              <q-item-label caption>16x30 99 mines</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="play(3)">
            <q-item-section>
              <q-item-label>Extreme</q-item-label>
              <q-item-label caption>24x30 180 mines</q-item-label>
            </q-item-section>
          </q-item>
          -->
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
export default {
  methods: {
    play(difficulty) {
      this.$router.push(`/minesweeper-${difficulty}`)
    }
  },
  computed: {
    DIFFICULTIES: function() {
      return this.$store.state.DIFFICULTIES
    }
  },
  mounted() {
    console.log(this.$store.state.DIFFICULTIES)
  }
}
</script>


<style scoped>
.container > * {
  margin-left:auto;
  margin-right:auto;
  display:block;
  text-align: center;
}
.btn-center {
  vertical-align: middle;
  line-height: 250%;
}
</style>