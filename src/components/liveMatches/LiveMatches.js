import React from "react";

const Match = props => {
  let blueScore = props.teams.blue.score;
  let redScore = props.teams.red.score;
  return (
    <tr>
      <td>
        {props.location} {blueScore} - {redScore}
      </td>
    </tr>
  );
};

const LiveMatches = props => {
  const { liveMatches } = props;

  const renderMatchList = () => {
    return liveMatches.map(currentMatch => {
      return (
        <Match
          location={currentMatch.location}
          teams={currentMatch.teams}
          key={currentMatch._id}
        />
      );
    });
  };

  return (
    <div className="col-6">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Matches</th>
          </tr>
        </thead>
        <tbody>{renderMatchList()}</tbody>
      </table>
    </div>
  );
};

export default LiveMatches;
