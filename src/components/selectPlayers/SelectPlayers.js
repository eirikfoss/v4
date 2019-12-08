import React, { useEffect } from "react";
import Player from "../player/Player";
import axios from "axios";
import {
  fetchPlayers,
  handleChosenPlayer
} from "../../redux/players/player-action";
import { useSelector, useDispatch } from "react-redux";
import { createMatch, fetchMatches } from "../../redux/matches/match-action";

const SelectPlayers = props => {
  const dispatch = useDispatch();
  const location = props.location;

  let { players: playerList, chosenPlayers: chosenPlayerList } = useSelector(
    state => state.playerReducer
  );

  useEffect(() => {
    dispatch(fetchPlayers());
  }, []);

  //render a list of players from the db
  const renderPlayers = () => {
    return playerList.map(currentPlayer => {
      return (
        <Player
          chosen={() => {
            handleChosen(currentPlayer);
          }}
          player={currentPlayer}
          key={currentPlayer._id}
        />
      );
    });
  };

  const handleChosen = player => {
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

    dispatch(handleChosenPlayer(playerList, chosenPlayerList));
  };

  //Render a list of chosen players
  const renderChosenPlayers = () => {
    return chosenPlayerList.map(currentPlayer => {
      return (
        <Player
          chosen={() => handleChosen(currentPlayer)}
          player={currentPlayer}
          key={currentPlayer._id}
        />
      );
    });
  };

  //Move chosen player from one list to the other

  const startGame = async () => {
    let teams = {
      blue: { players: [], score: 0 },
      red: { players: [], score: 0 }
    };
    let matchOver = false;

    if (chosenPlayerList.length === 4) {
      for (let i = 0; i < 2; i++) {
        teams.blue.players.push(chosenPlayerList[i]._id);
      }

      for (let i = 2; i < 4; i++) {
        teams.red.players.push(chosenPlayerList[i]._id);
      }

      const matchData = {
        teams,
        location,
        matchOver
      };
      console.log(matchData);

      dispatch(createMatch(matchData));

      /*
      await axios
        .post("http://localhost:5000/matches/add/", {
          location: { location },
          teams: { teams }
        })
        .then(dispatch(fetchMatches()))
        .catch(error => {
          console.log(error);
        });
        */
    }
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
            <button onClick={startGame} className="btn btn-lg">
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
