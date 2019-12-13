import { getMatches, deleteMatch } from "./player-service";

/* action types */
export const FETCH_MATCHES_REQUEST = "FETCH_MATCHES_REQUEST";
export const FETCH_MATCHES_SUCCESS = "FETCH_MATCHES_SUCCESS";
export const FETCH_MATCHES_FAIL = "FETCH_MATCHES_FAIL";

export const REMOVE_MATCH_REQUEST = "REMOVE_MATCH_REQUEST";
export const REMOVE_MATCH_SUCCESS = "REMOVE_MATCH_SUCCESS";
export const REMOVE_MATCH_FAIL = "REMOVE_MATCH_FAIL";

/* action creators: thunk version */
export const fetchMatches = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_MATCHES_REQUEST
    });
    try {
      const { data } = await getMatches();
      dispatch({ type: FETCH_MATCHES_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: FETCH_MATCHES_FAIL,
        payload: e.message
      });
    }
  };
};

export const removeMatch = id => {
  return async dispatch => {
    dispatch({
      type: REMOVE_MATCH_REQUEST
    });
    try {
      await deleteMatch(id);
      dispatch({ type: REMOVE_MATCH_SUCCESS, payload: id });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: REMOVE_MATCH_FAIL,
        payload: e.message
      });
    }
  };
};
