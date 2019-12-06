import React, { Component } from "react";
import SelectPlayers from "../selectPlayers/SelectPlayers";
import Scoreboard from "../scoreboard/Scoreboard";
import {
  getPlayersFromDb,
  getLocationMatchFromDb,
  updateMatchInDb,
  sendPlayerUpdateToDb,
  sendToPrevMatches
} from "../../services/handleDb";
import { calculatePlayerElo } from "../../services/calculatePlayerStats";

export default class MatchController extends Component {
  constructor(props) {
    super(props);
    this.getPlayersFromDb = getPlayersFromDb.bind(this);
    this.getLocationMatchFromDb = getLocationMatchFromDb.bind(this);
    this.updateMatchInDb = updateMatchInDb.bind(this);
    this.sendToPrevMatches = sendToPrevMatches.bind(this);
    this.sendPlayerUpdateToDb = sendPlayerUpdateToDb.bind(this);
    this.calculatePlayerElo = calculatePlayerElo.bind(this);
  }
  state = {
    location: this.props.location,
    matchActive: false,
    playerList: [],
    playerListIds: [],
    prevMatches: [],
    chosenPlayerList: [],
    ratingAdjustment: { blue: "", red: "" },
    matchData: {}
  };

  async componentDidMount() {
    await this.getPlayersFromDb();
    await this.getLocationMatchFromDb(this.props.location);
  }

  updateScoreCallback = newMatchData => {
    this.setState(
      {
        matchData: newMatchData
      },
      () => {
        //check if match is finished
        if (this.state.matchData.matchOver) {
          //Match is finished

          //Set matchController to show end of match results

          //calculate new player ratings

          //add match to player
          this.addMatchToPlayer(this.state.matchData, this.ratingAdjustment);

          //send matchInfo to previous matches and delete the game from current matches
          this.sendToPrevMatches(newMatchData);
        }
        this.updateMatchInDb(newMatchData);
      }
    );
  };

  //callback function to activate the activeMatch state
  startGameCallback = async () => {
    await this.getLocationMatchFromDb(this.props.location);
  };

  addMatchToPlayer = mData => {
    const newMatchData = mData;
    this.state.chosenPlayerList.map(currentPlayer => {
      const team =
        currentPlayer === mData.teams.blue.players[0] ||
        currentPlayer === mData.teams.blue.players[1]
          ? "Blue"
          : "Red";
      let player = this.getPlayerById(currentPlayer);
      let ratingAdjustment =
        team === "Blue"
          ? newMatchData.ratingAdjustment.blue
          : newMatchData.ratingAdjustment.red;

      const newRating = player.stats.rating - ratingAdjustment;

      player.stats.rating = newRating;
      player.matches.push(newMatchData._id);

      sendPlayerUpdateToDb(player, ratingAdjustment);
    });
  };

  //callback for updating playerList and ChosenPlayerList from player selection
  updateChosenPlayers = (pList, cList) => {
    this.setState({ playerListIds: pList, chosenPlayerList: cList });
  };

  getPlayerById = id => {
    return this.state.playerList.find(p => p._id === id);
  };

  toggleMatchActive = () => {
    this.setState({ matchActive: !this.state.matchActive });
  };

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

  getTeamRating = team => {
    const player1 = this.getPlayerById(team.players[0]);
    const player2 = this.getPlayerById(team.players[1]);
    const teamRating = (player1.stats.rating + player2.stats.rating) / 2;

    return teamRating;
  };

  //Rendering depending on matchActive
  checkMatchStatus = () => {
    let {
      location,
      playerList,
      playerListIds,
      chosenPlayerList,
      matchData
    } = this.state;
    if (!this.state.matchActive) {
      return (
        <SelectPlayers
          location={location}
          playerListIds={playerListIds}
          chosenPlayerList={chosenPlayerList}
          updateChosenPlayers={this.updateChosenPlayers}
          getPlayerById={this.getPlayerById}
          startGame={this.startGameCallback}
        />
      );
    } else {
      return (
        <Scoreboard
          matchData={matchData}
          updateScore={this.updateScoreCallback}
          getPlayerById={this.getPlayerById}
          playerList={playerList}
          toggleMatchActive={this.toggleMatchActive}
          calculateRatingAdjustment={this.calculateRatingAdjustment}
        />
      );
    }
  };

  render() {
    const { location } = this.props;

    return this.checkMatchStatus(location);
  }
}
