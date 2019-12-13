import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { matchReducer } from "../matches/match-reducer";
import { playerReducer } from "../players/player-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  playerReducer,
  matchReducer
});

const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];
const store = createStore(
  rootReducer,
  withDevTools(applyMiddleware(...middleware))
);

export default store;
