import * as types from "./match-action";

const initialState = {
  matches: [{ _id: "", location: "" }],
  match: false,
  matchOver: false,
  isLoading: false,
  dataLoaded: false,
  matchReady: false,
  error: ""
};

export const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MATCHES_REQUEST:
      return { ...state, isLoading: true, dataLoaded: false };
    case types.FETCH_MATCHES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        matches: action.payload,
        dataLoaded: true
      };
    case types.FETCH_MATCHES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        dataLoaded: false
      };
    case types.FETCH_MATCHBYLOCATION_REQUEST:
      return { ...state, isLoading: true, dataLoaded: false };
    case types.FETCH_MATCHBYLOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataLoaded: true,
        match: action.payload
      };
    case types.FETCH_MATCHBYLOCATION_FAIL:
      return {
        ...state,
        isLoading: false,
        dataLoaded: false,
        error: action.payload
      };
    case types.CREATE_MATCH_REQUEST:
      return { ...state, isLoading: true };
    case types.CREATE_MATCH_SUCCESS:
      return { ...state, isLoading: false, match: action.payload };
    case types.CREATE_MATCH_FAIL:
      return { ...state, isLoading: false };
    case types.UPDATE_MATCH_REQUEST:
      return { ...state, isLoading: true };
    case types.UPDATE_MATCH_SUCCESS:
      return { ...state, isLoading: false, match: action.payload };
    case types.UPDATE_MATCH_FAIL:
      return { ...state, isLoading: false };
    case types.REMOVE_MATCH_REQUEST:
      return { ...state, isLoading: true };
    case types.REMOVE_MATCH_SUCCESS:
      return {
        ...state,
        matches: state.matches.filter(match => match.id !== action.payload),
        matchOver: true,
        isLoading: false
      };
    case types.REMOVE_MATCH_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
