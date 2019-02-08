import React from "react";
import List from "./list";
import logo from '../logo.svg';

export default class Home extends React.PureComponent{

    constructor(props) {
      super(props); 

    }

    render() {
      return (
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Hello there what
        <h1> ROBOFONT </h1>
        
      <List stateChanger={this.props.stateChanger}/>
      hello there
      </header>
      );
    }
   

 }