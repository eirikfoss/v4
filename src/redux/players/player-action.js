import { getPlayers, deletePlayer, updPlayer } from "./player-service";

/* action types */
export const FETCH_PLAYERS_REQUEST = "FETCH_PLAYERS_REQUEST";
export const FETCH_PLAYERS_SUCCESS = "FETCH_PLAYERS_SUCCESS";
export const FETCH_PLAYERS_FAIL = "FETCH_PLAYERS_FAIL";

export const REMOVE_PLAYER_REQUEST = "REMOVE_PLAYER_REQUEST";
export const REMOVE_PLAYER_SUCCESS = "REMOVE_PLAYER_SUCCESS";
export const REMOVE_PLAYER_FAIL = "REMOVE_PLAYER_FAIL";

export const UPDATE_PLAYER_REQUEST = "UPDATE_PLAYER_REQUEST";
export const UPDATE_PLAYER_SUCCESS = "UPDATE_PLAYER_SUCCESS";
export const UPDATE_PLAYER_FAIL = "UPDATE_PLAYER_FAIL";

export const HANDLE_CHOSEN_REQUEST = "HANDLE_CHOSEN_REQUEST";
export const HANDLE_CHOSEN_SUCCESS = "HANDLE_CHOSEN_SUCCESS";
export const HANDLE_CHOSEN_FAIL = "HANDLE_CHOSEN_FAIL";

/* action creators: thunk version */
export const fetchPlayers = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_PLAYERS_REQUEST
    });
    try {
      const { data } = await getPlayers();
      dispatch({ type: FETCH_PLAYERS_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: FETCH_PLAYERS_FAIL,
        payload: e.message
      });
    }
  };
};

export const handleChosenPlayer = (pList, cList) => {
  return dispatch => {
    dispatch({
      type: HANDLE_CHOSEN_REQUEST
    });
    try {
      const data = { pList, cList };
      dispatch({ type: HANDLE_CHOSEN_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: HANDLE_CHOSEN_FAIL,
        payload: e.message
      });
    }
  };
};

export const updatePlayer = player => {
  return async dispatch => {
    dispatch({
      type: UPDATE_PLAYER_REQUEST
    });
    try {
      const { data } = await updPlayer(player);
      dispatch({ type: UPDATE_PLAYER_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: UPDATE_PLAYER_FAIL,
        payload: e.message
      });
    }
  };
};

export const removePlayer = id => {
  return async dispatch => {
    dispatch({
      type: REMOVE_PLAYER_REQUEST
    });
    try {
      await deletePlayer(id);
      dispatch({ type: REMOVE_PLAYER_SUCCESS, payload: id });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: REMOVE_PLAYER_FAIL,
        payload: e.message
      });
    }
  };
};
