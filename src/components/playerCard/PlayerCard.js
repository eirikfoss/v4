import React from "react";
import "./_playerCard.scss";

const PlayerCard = props => {
  let { player } = props;
  const tmpPlayer = { username: "Bobo", stats: { rating: 1500 } };

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
        <p>{}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
