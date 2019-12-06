import React from "react";

const Player = props => {
  return (
    <tr onClick={props.chosen}>
      <td>{props.player.username}</td>
    </tr>
  );
};

export default Player;
