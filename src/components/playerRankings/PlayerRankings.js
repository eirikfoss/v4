import React from "react";

const PlayerRankings = props => {
  let playerList = props.playerList;
  let prevMatches = props.prevMatches;

  const Player = props => {
    let player = props.player;
    let stats = props.stats;

    return (
      <div className="card" style={{ width: "10rem" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Messi_vs_Nigeria_2018.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{player.username}</h5>
          <p>Wins: {stats.wins}</p>
          <p>Loss: {stats.loss}</p>
          <p>Rating: {player.stats.rating}</p>
        </div>
      </div>
    );
  };

  const renderPlayers = () => {
    return playerList.map(currentPlayer => {
      const stats = calculateStats(currentPlayer);
      return (
        <Player player={currentPlayer} key={currentPlayer._id} stats={stats} />
      );
    });
  };

  const calculateStats = player => {
    let stats = { wins: 0, loss: 0 };
    prevMatches.map(currentMatch => {
      let wTeam = currentMatch.match.teams.blue.score === 10 ? "Blue" : "Red";

      let pTeam =
        currentMatch.match.teams.blue.players[0] === player._id ||
        currentMatch.match.teams.blue.players[1] === player._id
          ? "Blue"
          : "Red";

      pTeam === wTeam ? stats.wins++ : stats.loss++;
    });
    return stats;
  };

  return <div className="d-flex flex-wrap">{renderPlayers()}</div>;
};

export default PlayerRankings;
