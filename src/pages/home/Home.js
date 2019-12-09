import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMatches, removeMatch } from "../../redux/matches/match-action";
import { fetchPlayers } from "../../redux/players/player-action";

const Home = () => {
  const dispatch = useDispatch();

  const { matches } = useSelector(state => state.matchReducer);
  const { players } = useSelector(state => state.playerReducer);

  useEffect(() => {
    dispatch(fetchMatches());
    dispatch(fetchPlayers());
  }, []);

  console.log(matches);

  return (
    <div>
      <h1>Hello World! {matches[0].location}</h1>
    </div>
  );
};

export default Home;
