import React from "react";
import Player from "../player/Player";
import axios from "axios";

const SelectPlayers = props => {
  let {
    location,
    playerListIds,
    chosenPlayerList,
    updateChosenPlayers,
    getPlayerById,
    startGame
  } = props;

  //create a list of players from the db
  const renderPlayers = () => {
    return playerListIds.map(currentPlayer => {
      return (
        <Player
          chosen={() => handleChosenPlayer(currentPlayer)}
          player={getPlayerById(currentPlayer)}
          key={currentPlayer}
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
          player={getPlayerById(currentPlayer)}
          key={currentPlayer}
        />
      );
    });
  };

  //Move chosen player from one list to the other
  const handleChosenPlayer = player => {
    let cList = chosenPlayerList;
    let pList = playerListIds;

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
    let teams = {
      blue: { players: [], score: 0 },
      red: { players: [], score: 0 }
    };
    let matchOver = false;

    if (chosenPlayerList.length === 4) {
      for (let i = 0; i < 2; i++) {
        teams.blue.players.push(chosenPlayerList[i]);
      }

      for (let i = 2; i < 4; i++) {
        teams.red.players.push(chosenPlayerList[i]);
      }

      axios
        .post("http://localhost:5000/matches/add/", {
          teams,
          location,
          matchOver
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
