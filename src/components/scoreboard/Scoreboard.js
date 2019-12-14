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
    let ratingAdjustments;

    if (!match.matchOver) {
      if (e.type === "click") {
        newMatchData.teams.blue.score++;
        console.log("Blue Score: " + newMatchData.teams.blue.score);
      } else if (e.type === "contextmenu") {
        newMatchData.teams.red.score++;
        console.log("Red Score: " + newMatchData.teams.red.score);
      }

      if (
        newMatchData.teams.blue.score === 10 ||
        newMatchData.teams.red.score === 10
      ) {
        //Match is over
        newMatchData.matchOver = true;

        //calculate new ratings
        ratingAdjustments = calculateRatingAdjustment();

        console.log(calculateExpectedScore());
        console.log(calculateTeamRating(match.teams.blue));
        console.log(ratingAdjustments);
      }

      //update match
      dispatch(updateMatch(newMatchData));
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

  /*
calculateRatingAdjustment = matchData => {
    //const blueRating = 1000;
    //const redRating = 1000;
    const blueRating = this.getTeamRating(matchData.teams.blue);
    const redRating = this.getTeamRating(matchData.teams.red);
    const scoreBlue = matchData.teams.blue.score;
    const scoreRed = matchData.teams.red.score;
    const ratingFactor = 1000;
    const expectedBlue =
      1 / (1 + Math.pow(10, (redRating - blueRating) / ratingFactor));
    const expectedRed =
      1 / (1 + Math.pow(10, (blueRating - redRating) / ratingFactor));
    console.log("Expected blue: " + expectedBlue);
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
    const adjustmentBlue = blueRating - newRatingBlue;
    const adjustmentRed = redRating - newRatingRed;
    const ratingAdjustments = { blue: adjustmentBlue, red: adjustmentRed };
    return ratingAdjustments;
  };
  
  */

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
