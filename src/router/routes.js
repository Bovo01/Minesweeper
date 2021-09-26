const routes = [{
    path: '/',
    component: () => import('layouts/Menu.vue'),
  }, {
    path: '/minesweeper-:difficultyId',
    component: () => import('layouts/Minesweeper.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
