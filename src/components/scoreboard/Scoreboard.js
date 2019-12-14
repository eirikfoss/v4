import React from "react";
import "./_scoreboard.scss";
import PlayerCard from "../playerCard/PlayerCard";
import { useSelector, useDispatch } from "react-redux";
import { updateMatch, removeMatch } from "../../redux/matches/match-action";
import { updatePlayer } from "./../../redux/players/player-action";
import { sendToPrevMatches } from "../../redux/prevMatches/prevMatch-action";

const Scoreboard = () => {
  let { match, matchOver } = useSelector(state => state.matchReducer);
  const dispatch = useDispatch();

  function onKeyPressed(e) {
    let newMatchData = match;
    let ratingAdjustments;

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
        ratingAdjustments = calculateRatingAdjustment();

        //Update match
        dispatch(updateMatch(newMatchData));

        //send players to db
        sendPlayers(newMatchData.teams, ratingAdjustments);

        //send match to prevMatches
        dispatch(sendToPrevMatches(newMatchData));

        //Delete match from live matches
        dispatch(removeMatch(match));
      }

      //update match

      if (!matchOver) {
        dispatch(updateMatch(newMatchData));
      }
    }
  }

  const calculateTeamRating = team => {
    const rating =
      (team.players[0].stats.rating + team.players[1].stats.rating) / 2;
    return rating;
  };

  const calculateExpectedScore = () => {
    const blueRating = calculateTeamRating(match.teams.blue);
    const redRating = calculateTeamRating(match.teams.red);

    const ratingFactor = 1000;

    const expectedBlue =
      1 / (1 + Math.pow(10, (redRating - blueRating) / ratingFactor));
    const expectedRed =
      1 / (1 + Math.pow(10, (blueRating - redRating) / ratingFactor));

    const expectedScores = { blue: expectedBlue, red: expectedRed };

    return expectedScores;
  };

  const calculateRatingAdjustment = () => {
    const scoreBlue = match.teams.blue.score;
    const scoreRed = match.teams.red.score;

    const blueRating = calculateTeamRating(match.teams.blue);
    const redRating = calculateTeamRating(match.teams.red);

    const expectedScores = calculateExpectedScore();
    const expectedBlue = expectedScores.blue;
    const expectedRed = expectedScores.red;

    const newRatingBlue =
      scoreBlue > scoreRed
        ? Math.round(blueRating + 100 * (10 / (10 + scoreRed) - expectedBlue))
        : Math.round(
            blueRating + 100 * (1 - 10 / (10 + scoreBlue) - expectedBlue)
          );
    const newRatingRed =
      scoreRed > scoreBlue
        ? Math.round(redRating + 100 * (10 / (10 + scoreBlue) - expectedRed))
        : Math.round(
            redRating + 100 * (1 - 10 / (10 + scoreRed) - expectedRed)
          );
    const adjustmentBlue = newRatingBlue - blueRating;
    const adjustmentRed = newRatingRed - redRating;
    const adjustments = { blue: adjustmentBlue, red: adjustmentRed };

    return adjustments;
  };

  const sendPlayers = (teams, ratingAdjustments) => {
    const blueTeam = teams.blue;
    const redTeam = teams.red;

    for (let i = 0; i < 2; i++) {
      blueTeam.players[i].stats.rating += ratingAdjustments.blue;
      redTeam.players[i].stats.rating += ratingAdjustments.red;

      if (match.teams.blue.score === 10) {
        blueTeam.players[i].stats.wins++;
        redTeam.players[i].stats.loss++;
      } else {
        blueTeam.players[i].stats.loss++;
        redTeam.players[i].stats.wins++;
      }

      dispatch(updatePlayer(blueTeam.players[i]));
      dispatch(updatePlayer(redTeam.players[i]));
    }
  };

  const renderTeam = team => {
    let t = team === "blue" ? match.teams.blue : match.teams.red;

    return (
      <div className="d-flex justify-content-center">
        <PlayerCard
          player={t.players[0]}
          expectedScore={calculateExpectedScore(match)}
        />
        <PlayerCard
          player={t.players[1]}
          expectedScore={calculateExpectedScore(match)}
        />
      </div>
    );
  };

  const renderNewMatchOptions = () => {
    return (
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-primary c_button">
          <p>New Match</p>
        </button>
        <button type="button" className="btn btn-primary c_button">
          <p>Rematch</p>
        </button>
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
      {renderTeam("blue")}
      <h1>
        {match.teams.blue.score} - {match.teams.red.score}
      </h1>
      {matchOver ? renderNewMatchOptions() : <div></div>}
    </div>
  );
};

export default Scoreboard;
