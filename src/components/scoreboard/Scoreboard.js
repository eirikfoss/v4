import React from "react";
import "./_scoreboard.scss";
import PlayerCard from "../playerCard/PlayerCard";

const Scoreboard = props => {
  const { match } = props;
  const { teams } = props.match;

  function onKeyPressed(e) {
    let newMatchData = match;

    if (!match.matchOver) {
      if (e.type === "click") {
        newMatchData.teams.blue.score++;
      } else if (e.type === "contextmenu") {
        newMatchData.teams.red.score++;
      }

      if (
        newMatchData.teams.blue.score === 10 ||
        newMatchData.teams.red.score === 10
      ) {
        //Match is over
        newMatchData.matchOver = true;
        //calculate new ratings
      }
    }
  }

  const renderTeam = team => {
    let t = team === "blue" ? teams.blue : teams.red;

    return (
      <div className="d-flex justify-content-center">
        <PlayerCard
          id={t.players[0]}
          playerList={playerList}
          getPlayerById={getPlayerById}
        />
        <PlayerCard
          id={t.players[1]}
          playerList={playerList}
          getPlayerById={getPlayerById}
        />
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
      <div className="d-flex justify-content-center c_center">
        {renderTeam("blue")}
        <h1 className="centered c_score">
          {match.teams.blue.score} - {match.teams.red.score}
        </h1>
        {renderTeam("red")}
      </div>
    </div>
  );
};

export default Scoreboard;
