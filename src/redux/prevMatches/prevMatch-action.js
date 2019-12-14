import {
  getPrevMatches,
  deletePrevMatch,
  addToPrevMatches
} from "./prevMatch-service";

/* action types */
export const FETCH_PREV_MATCHES_REQUEST = "FETCH_PREV_MATCHES_REQUEST";
export const FETCH_PREV_MATCHES_SUCCESS = "FETCH_PREV_MATCHES_SUCCESS";
export const FETCH_PREV_MATCHES_FAIL = "FETCH_PREV_MATCHES_FAIL";

export const ADD_PREV_MATCHES_REQUEST = "ADD_PREV_MATCHES_REQUEST";
export const ADD_PREV_MATCHES_SUCCESS = "ADD_PREV_MATCHES_SUCCESS";
export const ADD_PREV_MATCHES_FAIL = "ADD_PREV_MATCHES_FAIL";

export const REMOVE_PREV_MATCH_REQUEST = "REMOVE_PREV_MATCH_REQUEST";
export const REMOVE_PREV_MATCH_SUCCESS = "REMOVE_PREV_MATCH_SUCCESS";
export const REMOVE_PREV_MATCH_FAIL = "REMOVE_PREV_MATCH_FAIL";

/* action creators: thunk version */
export const fetchPrevMatches = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_PREV_MATCHES_REQUEST
    });
    try {
      const { data } = await getPrevMatches();
      dispatch({ type: FETCH_PREV_MATCHES_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: FETCH_PREV_MATCHES_FAIL,
        payload: e.message
      });
    }
  };
};

export const sendToPrevMatches = matchData => {
  return async dispatch => {
    dispatch({
      type: ADD_PREV_MATCHES_REQUEST
    });
    try {
      const { data } = await addToPrevMatches(matchData);
      dispatch({ type: ADD_PREV_MATCHES_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: ADD_PREV_MATCHES_FAIL,
        payload: e.message
      });
    }
  };
};

export const removePrevMatch = id => {
  return async dispatch => {
    dispatch({
      type: REMOVE_PREV_MATCH_REQUEST
    });
    try {
      await deletePrevMatch(id);
      dispatch({ type: REMOVE_PREV_MATCH_SUCCESS, payload: id });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: REMOVE_PREV_MATCH_FAIL,
        payload: e.message
      });
    }
  };
};
