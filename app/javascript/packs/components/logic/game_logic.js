import { kea } from 'kea'

const gameLogic = kea({
  actions: {
    loadGames: true,
    createGame: true,
    setGames: (games) => (games),
    setFetchError: (error) => ({ error }),
    addGame: (game) => (game)
  },

  reducers: {
    games: [[], {
      setGames: (_, payload) => payload,
      addGame: (state, game) => {
        console.log(state);
        console.log(game);
        console.log('GAME ADDED');

        return {...state, active: [...state.active, game]};
      }
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
      const url = 'http://localhost:3000/api/v1/games';

      const response = await window.fetch(url)
      const data = await response.json()
      console.log("LISTENER MAKING API CALL");
      console.log(response.status)
      console.log(data);

      if (response.status === 200) {
        actions.setGames(data);
      } else {
        actions.setFetchError(data.message);
      }
    },

    createGame: async () => {
      const url = 'http://localhost:3000/api/v1/games';
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

      const requestOptions = { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf } };
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log("LISTENER MAKING API CALL TO CREATE GAME");
      console.log(response.status)
      console.log(data);
      if (response.status === 200) {
        actions.addGame(data);
      } else {
        actions.setFetchError(data.message);
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

