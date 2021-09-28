import { kea } from 'kea'

const gameplayLogic = kea({
  actions: {
    loadGame: (gameId) => (gameId),
    submitAttempt: (spotIndex) => (spotIndex),
    setGame: (game) => (game),
    setFetchError: (error) => ({ error }),
    receivedGameUpdate: (game) => (game)
  },

  reducers: {
    gameId: [null, {
      loadGame: (_, gameId) => gameId,
    }],
    game: [{}, {
      setGame: (_, payload) => payload,
      receivedGameUpdate: (_, payload) => payload,
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
      console.log("GAMEPLAY LISTENER MAKING API CALL");
      const url = `http://localhost:3000/api/v1/games/${values.gameId}`

      const response = await window.fetch(url)
      const json = await response.json()

      console.log(response.status)
      console.log(json);

      if (response.status === 200) {
        actions.setGame(json);
      } else {
        actions.setFetchError(json.message);
      }
    },

    submitAttempt: async (spotIndex) => {
      console.log("LISTENER MAKING API CALL TO SUBMIT PLAYER ATTEMPT");
      const url = `http://localhost:3000/api/v1/games/${values.gameId}/player_attempt`;
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

      const requestOptions = { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf }, body: JSON.stringify({attempt_identifier: spotIndex}) };
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      console.log(response.status)

      if (response.status === 200) {
        console.log('attempts submitted');
      } else {
        console.log(response.data);
      }
    }
  }),

  // events: ({ actions, values }) => ({
  //   afterMount: () => {
  //     console.log('GAMEPLAY COMPONENT MOUNTED');
  //     actions.loadGame(values.gameId);
  //   }
  // })
})

export default gameplayLogic;

