import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMathces, removeMatch } from "../../shared/matches/match-action";
import Button from "@material-ui/core/Button";

export default class Home extends Component {
  render() {
    console.log("Hello World");
    return <div>Hello World</div>;
  }
}
