import React from "react";
import "./_playerCard.scss";

const PlayerCard = props => {
  let { player } = props;
  let winPercentage =
    (player.stats.wins / (player.stats.wins + player.stats.loss)) * 100;
  let winP = winPercentage.toFixed(2);

  return (
    <div className="card c_margin" style={{ width: "12rem" }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Messi_vs_Nigeria_2018.jpg"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{player.username}</h5>
        <p>Rating: {player.stats.rating}</p>
        <p>Win% {winP}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
