import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SelectPlayers from "./../selectPlayers/SelectPlayers";
import { fetchMatchByLocation } from "../../redux/matches/match-action";

export default function MatchController(props) {
  const dispatch = useDispatch();
  const location = props.location;

  let { match, isLoading, dataLoaded } = useSelector(
    state => state.matchReducer
  );

  useEffect(() => {
    dispatch(fetchMatchByLocation(location));
  }, []);

  console.log(match);

  return (
    <>
      {match ? (
        <h1>Match in {match.loction} is live</h1>
      ) : (
        <SelectPlayers location={location} />
      )}
    </>
  );
}
