import axios from "axios";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:4001");

const playerAPI = "http://localhost:5000/players/";
const matchAPI = "http://localhost:5000/matches/";

function getPlayersFromDb() {
  axios
    .get(playerAPI)
    .then(response => {
      let playerList = response.data;
      let playerListIds = [];
      for (let i = 0; i < response.data.length; i++) {
        playerListIds.push(playerList[i]._id);
      }
      this.setState({ playerList, playerListIds });
    })
    .catch(error => {
      console.log(error);
    });
}

function sendPlayerUpdateToDb(player, adjustment) {
  const url = playerAPI + "update/" + player._id;

  axios
    .post(url, player)
    .then(response => {
      console.log(player.stats.rating, adjustment);
    })
    .catch(error => {
      console.log(error);
    });
}

function getListOfMatches() {
  axios
    .get("http://localhost:5000/matches/")
    .then(response => {
      this.setState({ liveMatches: response.data });
    })
    .catch(error => {
      console.log(error);
    });
}

function getPrevMatches() {
  axios
    .get("http://localhost:5000/prevmatches/")
    .then(response => {
      this.setState({ prevMatches: response.data });
    })
    .catch(error => {
      console.log(error);
    });
}

function getLocationMatchFromDb(location) {
  axios
    .get("http://localhost:5000/matches/")
    .then(response => {
      const matches = [...response.data];
      const match = matches.filter(matches => {
        return matches.location === location;
      });

      this.setState({ matchData: match[0] });

      if (match.length > 0) {
        this.setState({ matchActive: !this.state.matchActive });
      } else {
        console.log("No match in " + location);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function updateMatchInDb(newMatchData) {
  const id = this.state.matchData._id;
  const url = "http://localhost:5000/matches/update/" + id;

  axios
    .post(url, newMatchData)
    .then(response => {
      socket.emit("goal");
    })
    .catch(error => {
      console.log(error);
    });
}

function sendToPrevMatches(matchData) {
  const match = matchData;
  axios
    .post("http://localhost:5000/prevMatches/add/", { match })
    .then(response => {
      deleteMatch(match._id);
    })
    .catch(error => {
      console.log(error);
    });
}

function deleteMatch(matchId) {
  axios
    .delete(matchAPI + matchId)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

export {
  getPlayersFromDb,
  getListOfMatches,
  getLocationMatchFromDb,
  getPrevMatches,
  updateMatchInDb,
  sendToPrevMatches,
  sendPlayerUpdateToDb
};
