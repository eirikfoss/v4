import React from "react";
import Player from "../player/Player";
import axios from "axios";

const SelectPlayers = props => {
  let {
    location,
    playerList,
    chosenPlayerList,
    updateChosenPlayers,
    startGame
  } = props;

  //create a list of players from the db
  const renderPlayers = () => {
    return playerList.map(currentPlayer => {
      return (
        <Player
          chosen={() => handleChosenPlayer(currentPlayer)}
          player={currentPlayer}
          key={currentPlayer._id}
        />
      );
    });
  };

  //create a list of chosen players
  const renderChosenPlayers = () => {
    return chosenPlayerList.map(currentPlayer => {
      return (
        <Player
          chosen={() => handleChosenPlayer(currentPlayer)}
          player={currentPlayer}
          key={currentPlayer._id}
        />
      );
    });
  };

  //Move chosen player from one list to the other
  const handleChosenPlayer = player => {
    let cList = chosenPlayerList;
    let pList = playerList;

    if (pList.includes(player)) {
      if (cList.length <= 3) {
        let index = pList.indexOf(player);
        if (index !== -1) {
          pList.splice(index, 1);
        }
      } else return;

      cList.push(player);
    } else {
      let index = cList.indexOf(player);
      if (index !== -1) {
        cList.splice(index, 1);
      }

      pList.push(player);
    }
    updateChosenPlayers(pList, cList);
  };

  const sendPlayers = () => {
    let blueTeam = [];
    let redTeam = [];
    let teams = [];
    let score = [0, 0];

    if (chosenPlayerList.length === 4) {
      for (let i = 0; i < 2; i++) {
        blueTeam.push(chosenPlayerList[i]);
      }
      teams.push(blueTeam);
      for (let i = 2; i < 4; i++) {
        redTeam.push(chosenPlayerList[i]);
      }
      teams.push(redTeam);

      axios
        .post("http://localhost:5000/matches/add/", { teams, location, score })
        .then(response => {
          console.log(response.data);
        })
        .then(startGame())
        .catch(error => {
          console.log(error);
        });
    }
    startGame();
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Players</th>
                </tr>
              </thead>
              <tbody>{renderPlayers()}</tbody>
            </table>
          </div>
          <div className="col-sm">
            <button onClick={sendPlayers} className="btn btn-lg">
              Start
            </button>
          </div>
          <div className="col-sm">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Selected</th>
                </tr>
              </thead>
              <tbody>{renderChosenPlayers()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPlayers;
