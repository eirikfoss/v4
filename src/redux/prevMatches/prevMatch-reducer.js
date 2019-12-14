import * as types from "./match-action";

const initialState = {
  prevMatches: [],
  match: {
    _id: "",
    location: "",
    teams: {
      blue: { players: [], score: "" },
      red: { players: [], score: "" }
    }
  },
  isLoading: false,
  prevMatchId: "",
  error: ""
};

export const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MATCHES_REQUEST:
      return { ...state, isLoading: true };
    case types.FETCH_MATCHES_SUCCESS:
      return { ...state, isLoading: false, matches: action.payload };
    case types.FETCH_MATCHES_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case types.ADD_PREV_MATCHES_REQUEST:
      return { ...state, isLoading: true };
    case types.ADD_PREV_MATCHES_SUCCESS:
      return { ...state, isLoading: false, prevMatchId: action.payload._id };
    case types.ADD_PREV_MATCHES_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case types.REMOVE_MATCH_REQUEST:
      return { ...state, isLoading: true };
    case types.REMOVE_MATCH_SUCCESS:
      return {
        ...state,
        matches: state.matches.filter(match => match.id !== action.payload),
        isLoading: false
      };
    case types.REMOVE_MATCH_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
