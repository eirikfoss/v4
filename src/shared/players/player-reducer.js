import * as types from "./player-actions";

const initialState = {
  players: [],
  player: {
    _id: "",
    username: "",
    teams: [],
    matches: [],
    stats: { wins: "", loss: "", rating: "" }
  },
  isLoading: false,
  error: ""
};

export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PLAYERS_REQUEST:
      return { ...state, isLoading: true };
    case types.FETCH_PLAYERS_SUCCESS:
      return { ...state, isLoading: false, players: action.payload };
    case types.FETCH_PLAYERS_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case types.REMOVE_PLAYER_REQUEST:
      return { ...state, isLoading: true };
    case types.REMOVE_PLAYER_SUCCESS:
      return {
        ...state,
        players: state.players.filter(player => player.id !== action.payload),
        isLoading: false
      };
    case types.REMOVE_PLAYER_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
