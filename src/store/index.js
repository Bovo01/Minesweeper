import {
  store
} from 'quasar/wrappers'
import {
  createStore
} from 'vuex'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function ( /* { ssrContext } */ ) {
  const Store = createStore({
    modules: {
      // example
    },
    state: {
      DIFFICULTIES: [{
        name: "Easy",
        id: "0",
        rows: 9,
        cols: 9,
        mines: 10
      }, {
        name: "Medium",
        id: "1",
        rows: 16,
        cols: 16,
        mines: 40
      }, {
        name: "Advanced",
        id: "2",
        rows: 30,
        cols: 16,
        mines: 99
      }, {
        name: "Expert",
        id: "3",
        rows: 30,
        cols: 24,
        mines: 180
      }]
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
