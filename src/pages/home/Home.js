import React, { Component } from "react";
import LiveMatches from "../../components/liveMatches/LiveMatches";
import { getPlayersFromDb, getListOfMatches } from "../../services/handleDb";
import axios from "axios";
import openSocket from "socket.io-client";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.getPlayersFromDb = getPlayersFromDb.bind(this);
    this.getListOfMatches = getListOfMatches.bind(this);
  }
  state = {
    playerList: [],
    liveMatches: [{ _id: 0, location: "", score: [0, 0] }]
  };

  async componentDidMount() {
    await this.getListOfAllMatches();
    await this.getPlayersFromDb();

    const socket = openSocket("http://localhost:4001");

    socket.on("updateMatches", () => {
      console.log("Updating Matches");
      this.getListOfAllMatches();
    });
  }

  getListOfAllMatches = () => {
    axios
      .get("http://localhost:5000/matches/")
      .then(response => {
        this.setState({ liveMatches: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { liveMatches } = this.state;
    return (
      <LiveMatches
        liveMatches={liveMatches}
        playerList={this.state.playerList}
      />
    );
  }
}
