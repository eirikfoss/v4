import * as types from "./player-action";

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
  chosenPlayers: [],
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
        isLoading: false
      };
    case types.REMOVE_PLAYER_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case types.UPDATE_PLAYER_REQUEST:
      return { ...state, isLoading: true };
    case types.UPDATE_PLAYER_SUCCESS:
      return {
        ...state,
        players: state.players.filter(player => player.id !== action.payload),
        isLoading: false
      };
    case types.UPDATE_PLAYER_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case types.HANDLE_CHOSEN_REQUEST:
      return { ...state, isLoading: true };
    case types.HANDLE_CHOSEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playerList: action.payload.pList,
        chosenPlayers: action.payload.cList
      };
    case types.HANDLE_CHOSEN_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
