import { getMatches, postMatch, deleteMatch, updMatch } from "./match-service";

/* action types */
export const FETCH_MATCHES_REQUEST = "FETCH_MATCHES_REQUEST";
export const FETCH_MATCHES_SUCCESS = "FETCH_MATCHES_SUCCESS";
export const FETCH_MATCHES_FAIL = "FETCH_MATCHES_FAIL";

export const CREATE_MATCH_REQUEST = "CREATE_MATCH_REQUEST";
export const CREATE_MATCH_SUCCESS = "CREATE_MATCH_SUCCESS";
export const CREATE_MATCH_FAIL = "CREATE_MATCH_FAIL";

export const UPDATE_MATCH_REQUEST = "UPDATE_MATCH_REQUEST";
export const UPDATE_MATCH_SUCCESS = "UPDATE_MATCH_SUCCESS";
export const UPDATE_MATCH_FAIL = "UPDATE_MATCH_FAIL";

export const FETCH_MATCHBYLOCATION_REQUEST = "FETCH_MATCHBYLOCATION_REQUEST";
export const FETCH_MATCHBYLOCATION_SUCCESS = "FETCH_MATCHBYLOCATION_SUCCESS";
export const FETCH_MATCHBYLOCATION_FAIL = "FETCH_MATCHBYLOCATION_FAIL";

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

export const createMatch = matchData => {
  return async dispatch => {
    dispatch({
      type: CREATE_MATCH_REQUEST
    });
    try {
      const { data } = await postMatch(matchData);

      dispatch({ type: CREATE_MATCH_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: CREATE_MATCH_FAIL,
        payload: e.message
      });
    }
  };
};

export const updateMatch = matchData => {
  return async dispatch => {
    dispatch({
      type: UPDATE_MATCH_REQUEST
    });
    try {
      const { data } = await updMatch(matchData);

      dispatch({ type: UPDATE_MATCH_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: UPDATE_MATCH_FAIL,
        payload: e.message
      });
    }
  };
};

export const fetchMatchByLocation = location => {
  return async dispatch => {
    dispatch({
      type: FETCH_MATCHBYLOCATION_REQUEST
    });
    try {
      const { data } = await getMatches();
      const matchList = data.filter(matches => {
        return matches.location === location;
      });
      const activeMatch = matchList.length > 0 ? matchList[0] : false;
      dispatch({ type: FETCH_MATCHBYLOCATION_SUCCESS, payload: activeMatch });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: FETCH_MATCHBYLOCATION_FAIL,
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
