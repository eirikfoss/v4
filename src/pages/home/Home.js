import React, { useEffect } from "react";
import "./_home.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchMatches, removeMatch } from "../../redux/matches/match-action";
import { fetchPlayers } from "../../redux/players/player-action";
import "bootstrap/dist/css/bootstrap.css";
import PlayerCard from "../../components/playerCard/PlayerCard";
import MatchElement from "../../components/matchElement/MatchElement";

const Home = () => {
  const dispatch = useDispatch();

  const { matches, dataLoaded } = useSelector(state => state.matchReducer);
  const { players } = useSelector(state => state.playerReducer);

  useEffect(() => {
    dispatch(fetchMatches());
    dispatch(fetchPlayers());
  }, []);

  console.log(matches);

  const renderPlayers = () => {
    return (
      <ul>
        {players.map(p => (
          <li key={p._id}>
            <PlayerCard player={p} />
          </li>
        ))}
      </ul>
    );
  };

  const renderLiveMatches = () => {
    return (
      <ul>
        {matches.map(m => (
          <li key={m._id}>
            {console.log(m)}
            <MatchElement match={m} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          {dataLoaded ? renderLiveMatches() : <h1>Loading</h1>}
        </div>
        <div className="col c_playerList">
          <h1>Rankings</h1>
          {renderPlayers()}
        </div>
      </div>
    </div>
  );
};

export default Home;
