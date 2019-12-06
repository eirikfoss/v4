import React from "react";

const Match = match => {
  return (
    <tr>
      <td>
        {match.location} {match.score[0]} - {match.score[1]}
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
          key={currentMatch._id}
          location={currentMatch.location}
          score={currentMatch.score}
        />
      );
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Matches</th>
                </tr>
              </thead>
              <tbody>{renderMatchList()}</tbody>
            </table>
          </div>
          <div className="col-sm">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Players</th>
                </tr>
              </thead>
              <tbody>{renderMatchList()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMatches;
