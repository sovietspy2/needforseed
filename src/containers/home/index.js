import React from "react";
import "./styles.css"

export default class Home extends React.PureComponent{

    constructor(props) {
      super(props); 
      this.state = {

      };
    }

    render() {

      console.log("home rneder", this.state);
      
      return (
        <header className="App-header">
        <h1> Welcome to the page </h1>
        
        <p>This website is created by SovietSpy2</p>
        <p>Content produced by Govamoro</p>

        <h4>Features:</h4>
        <ul>
          <li>Authentication login / register</li>
          <li>Creating post</li>
          <li>Viewing post</li>
          <li>Liking post</li>
          <li>Commenting on post</li>
        </ul>

      have fun!
      </header>
      );
    }
   

 }