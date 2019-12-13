import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SelectPlayers from "./../selectPlayers/SelectPlayers";
import { fetchMatchByLocation } from "../../redux/matches/match-action";
import Scoreboard from "../scoreboard/Scoreboard";

export default function MatchController(props) {
  const dispatch = useDispatch();
  const location = props.location;

  let { match } = useSelector(state => state.matchReducer);

  useEffect(() => {
    dispatch(fetchMatchByLocation(location));
  }, []);

  return <>{match ? <Scoreboard /> : <SelectPlayers location={location} />}</>;
}
