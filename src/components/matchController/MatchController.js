import React, { Component } from "react";
import SelectPlayers from "../selectPlayers/SelectPlayers";
import Scoreboard from "../scoreboard/Scoreboard";
import {
  getPlayersFromDb,
  getLocationMatchFromDb,
  updateMatchInDb,
  updatePlayerDb,
  sendToPrevMatches
} from "../../services/handleDb";

export default class MatchController extends Component {
  constructor(props) {
    super(props);
    this.getPlayersFromDb = getPlayersFromDb.bind(this);
    this.getLocationMatchFromDb = getLocationMatchFromDb.bind(this);
    this.updateMatchInDb = updateMatchInDb.bind(this);
    this.sendToPrevMatches = sendToPrevMatches.bind(this);
  }
  state = {
    location: this.props.location,
    matchActive: false,
    renderResults: false,
    playerList: [],
    chosenPlayerList: [],
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
        if (newMatchData.score[0] === 10 || newMatchData.score[1] === 10) {
          //Match is finished

          //Set matchController to show end of match results

          //calculate new player ratings

          //add match and rating to player
          this.addResultToPlayers(newMatchData);
          //send matchInfo to previous matches and delete the game from current matches
          this.sendToPrevMatches(newMatchData);

          console.log("Win");
        }
        this.updateMatchInDb(newMatchData);
      }
    );
  };

  addResultToPlayers = async matchData => {
    const blueT = matchData.teams[0];
    const redT = matchData.teams[1];
    const blueS = matchData.score[0];
    const redS = matchData.score[1];

    //method takes winning team, losing team and matchData
    await updatePlayerDb(blueT, redT, blueS, redS);

    console.log();
  };

  calculateRating = (teamA, teamB) => {
    const teamARating = teamA[0].rating + teamA[1].rating;
    const teamBRating = teamB[0].rating + teamB[1].rating;

    const expectedA = 1 / Math.pow(1 + 100, (teamBRating - teamARating) / 500);
    const expectedB = 1 / Math.pow(1 + 100, (teamARating - teamBRating) / 500);

    const newRatingA = teamARating + 10 * (1 - expectedA);
    const newRatingB = teamBRating + 10 * (1 - 10 / (10 + 6) - expectedB);

    console.log(teamBRating - newRatingB);
    console.log(teamARating - newRatingA);
  };

  //callback function to activate the activeMatch state
  startGameCallback = async () => {
    await this.getLocationMatchFromDb(this.props.location);
  };

  //callback for updating playerList and ChosenPlayerList from player selection
  updateChosenPlayers = (pList, cList) => {
    this.setState({ playerList: pList, chosenPlayerList: cList });
  };

  //Rendering depending on matchActive
  checkMatchStatus = () => {
    let { location, playerList, chosenPlayerList, matchData } = this.state;
    if (!this.state.matchActive) {
      return (
        <SelectPlayers
          location={location}
          playerList={playerList}
          chosenPlayerList={chosenPlayerList}
          updateChosenPlayers={this.updateChosenPlayers}
          startGame={this.startGameCallback}
        />
      );
    } else {
      return (
        <Scoreboard
          matchData={matchData}
          updateScore={this.updateScoreCallback}
        />
      );
    }
  };

  render() {
    const { location } = this.props;

    return this.checkMatchStatus(location);
  }
}
