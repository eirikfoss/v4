import React, { Component } from "react";
import axios from "axios";

const Player = props => (
  <tr>
    <td>{props.player.username}</td>
    <td>{props.player.rating}</td>
    <td>{props.player.wins}</td>
    <td>{props.player.losses}</td>
  </tr>
);

export default class PlayerList extends Component {
  constructor(props) {
    super(props);

    this.state = { players: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/players/")
      .then(response => {
        this.setState({ players: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  playerList() {
    return this.state.players.map(currentplayer => {
      return <Player player={currentplayer} key={currentplayer._id} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Players</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Rating</th>
              <th>Wins</th>
              <th>Losses</th>
            </tr>
          </thead>
          <tbody>{this.playerList()}</tbody>
        </table>
      </div>
    );
  }
}
