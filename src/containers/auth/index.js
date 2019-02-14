import React from "react";
import "./styles.css"
import { Link } from "react-router-dom";

export default class Auth extends React.PureComponent{

    constructor(props) {
      super(props); 
      this.state = {

      };
    }

    render() {      
      return (
        <header className="App-header">
        <h1> OOoooops... </h1>
        
        <p>For this feature you should login!</p>
        <p>If you dont have an account you can create one just click  <Link to="/register">here</Link>!</p>

      have fun!
      </header>
      );
    }
   

 }