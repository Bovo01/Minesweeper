<template>
  <div class="container">
    <h3>MINESWEEPER</h3>

    <q-btn outline rounded style="width: 10vw" color="positive" label="Play">
        <q-menu class="align-menu">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Easy</q-item-label>
                <q-item-label caption>9x9 10 mines</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Medium</q-item-label>
                <q-item-label caption>16x16 40 mines</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Advanced</q-item-label>
                <q-item-label caption>16x30 99 mines</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Extreme</q-item-label>
                <q-item-label caption>24x30 180 mines</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
  </div>
</template>


<style scoped>
.container > * {
  margin-left:auto;
  margin-right:auto;
  display:block;
  text-align: center;
}
.align-menu {
  
}
</style>