import { kea } from 'kea'

const gameLogic = kea({
  actions: {
    loadGames: true,
    setGames: (games) => (games),
    setFetchError: (error) => ({ error })
  },

  reducers: {
    games: [{}, {
      setGames: (_, payload) => payload
    }],
    isLoading: [true, {
      setGames: () => false,
      setFetchError: () => false
    }],
    error: [null, {
      setFetchError: (_, { error }) => error
    }]
  },

  listeners: ({ actions }) => ({
    loadGames: async () => {
      const url = 'http://localhost:3000/api/v1/games'

      const response = await window.fetch(url)
      const json = await response.json()
      console.log("LISTENER MAKING API CALL");
      console.log(response.status)
      console.log(json);

      if (response.status === 200) {
        actions.setGames(json);
      } else {
        actions.setFetchError(json.message);
      }
    }
  }),

  events: ({ actions, values }) => ({
    afterMount: () => {
      console.log('COMPONENT MOUNTED');
      actions.loadGames();
    }
  })
})

export default gameLogic;

