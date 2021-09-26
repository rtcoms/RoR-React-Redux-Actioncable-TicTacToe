import { kea } from 'kea'

const gameplayLogic = kea({
  actions: {
    loadGame: (gameId) => (gameId),
    setGame: (game) => (game),
    setFetchError: (error) => ({ error })
  },

  reducers: {
    gameId: [1],
    game: [{}, {
      setGame: (_, payload) => payload
    }],
    isLoading: [true, {
      setGame: () => false,
      setFetchError: () => false
    }],
    error: [null, {
      setFetchError: (_, { error }) => error
    }]
  },

  listeners: ({ actions, values }) => ({
    loadGame: async () => {
      const url = `http://localhost:3000/api/v1/games/${values.gameId}`

      const response = await window.fetch(url)
      const json = await response.json()
      console.log("GAMEPLAY LISTENER MAKING API CALL");
      console.log(response.status)
      console.log(json);

      if (response.status === 200) {
        actions.setGame(json);
      } else {
        actions.setFetchError(json.message);
      }
    }
  }),

  events: ({ actions, values }) => ({
    afterMount: () => {
      console.log('GAMEPLAY COMPONENT MOUNTED');
      actions.loadGame(values.gameId);
    }
  })
})

export default gameplayLogic;

