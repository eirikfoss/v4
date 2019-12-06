import React from "react";
import "./_scoreboard.scss";
import PlayerCard from "../playerCard/PlayerCard";

const Scoreboard = props => {
  const { matchData, updateScore } = props;
  const { teams } = props.matchData;

  async function onKeyPressed(e) {
    let newScore = [...matchData.score];
    let newMatchData = { ...matchData };
    if (e.type === "click") {
      newScore[0]++;
    } else if (e.type === "contextmenu") {
      newScore[1]++;
    }
    newMatchData.score = newScore;

    await updateScore(newMatchData);
  }

  const renderTeam = i => {
    let player = teams[i];

    return (
      <div className="d-flex justify-content-center">
        <PlayerCard player={player[0]} />
        <PlayerCard player={player[1]} />
      </div>
    );
  };

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
        {renderTeam(0)}
        <h1 className="centered c_score">
          {matchData.score[0]} - {matchData.score[1]}
        </h1>
        {renderTeam(1)}
      </div>
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-primary c_button">
          <p>New Match</p>
        </button>
        <button type="button" className="btn btn-primary c_button">
          <p>Rematch</p>
        </button>
      </div>
    </div>
  );
};

export default Scoreboard;
