import React from "react";
import "./_scoreboard.scss";
import PlayerCard from "../playerCard/PlayerCard";
import { useSelector, useDispatch } from "react-redux";
import { updateMatch } from "../../redux/matches/match-action";

const Scoreboard = () => {
  let { match } = useSelector(state => state.matchReducer);
  const dispatch = useDispatch();

  function onKeyPressed(e) {
    let newMatchData = match;

    if (!match.matchOver) {
      if (e.type === "click") {
        newMatchData.teams.blue.score++;
        console.log(newMatchData.teams.blue.score);
      } else if (e.type === "contextmenu") {
        newMatchData.teams.red.score++;
        console.log(newMatchData.teams.red.score);
      }

      if (
        newMatchData.teams.blue.score === 10 ||
        newMatchData.teams.red.score === 10
      ) {
        //Match is over
        newMatchData.matchOver = true;

        //calculate new ratings
      }

      //update match
      dispatch(updateMatch(newMatchData));
    }
  }

  const renderTeam = team => {
    let t = team === "blue" ? match.teams.blue : match.teams.red;

    return (
      <div className="d-flex justify-content-center">
        <PlayerCard player={t.players[0]} />
        <PlayerCard player={t.players[1]} />
      </div>
    );
  };

  /* 
 const renderNewMatchOptions = (matchOver, toggleMatchActive) => {
    if (matchOver) {
      return (
        <div className="d-flex justify-content-center">
          <button
            onClick={toggleMatchActive}
            type="button"
            className="btn btn-primary c_button"
          >
            <p>New Match</p>
          </button>
          <button type="button" className="btn btn-primary c_button">
            <p>Rematch</p>
          </button>
        </div>
      );
    }
  };
  */

  return (
    <div
      className="p_fill"
      onClick={e => onKeyPressed(e)}
      onContextMenu={e => {
        e.preventDefault();
        onKeyPressed(e);
      }}
      tabIndex="0"
    >
      {renderTeam("blue")}
      <h1>
        {match.teams.blue.score} - {match.teams.red.score}
      </h1>
    </div>
  );
};

export default Scoreboard;
