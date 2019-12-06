import axios from "axios";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:4001");

const playerAPI = "http://localhost:5000/players/";
const matchAPI = "http://localhost:5000/matches/";

function getPlayersFromDb() {
  axios
    .get(playerAPI)
    .then(response => {
      this.setState({ playerList: response.data });
    })
    .catch(error => {
      console.log(error);
    });
}

function updatePlayerDb(bluePlayers, redPlayers, blueScore, redScore) {
  const scoreDifference = blueScore - redScore;

  //Saving matches as the score difference
  for (let i = 0; i < 2; i++) {
    const urlB = playerAPI + "update/" + bluePlayers[i]._id;
    const urlR = playerAPI + "update/" + redPlayers[i]._id;

    let newResultListB = bluePlayers[i].matches;
    let newResultListR = redPlayers[i].matches;

    newResultListB.push(scoreDifference);
    newResultListR.push(-scoreDifference);

    const payloadB = { matches: newResultListB };
    const payloadR = { matches: newResultListR };

    sendPlayerUpdateToDb(urlB, payloadB);
    sendPlayerUpdateToDb(urlR, payloadR);

    console.log(payloadB);
  }
}

function sendPlayerUpdateToDb(url, payload) {
  axios
    .post(url, payload)
    .then(response => {
      console.log(response);
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
  const score = newMatchData.score;
  const id = this.state.matchData._id;
  const url = "http://localhost:5000/matches/update/" + id;
  let payload = { score: [] };
  payload.score = score;

  axios
    .post(url, payload)
    .then(response => {
      socket.emit("goal");
      console.log("Match has been updated");
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
  updateMatchInDb,
  updatePlayerDb,
  sendToPrevMatches
};
