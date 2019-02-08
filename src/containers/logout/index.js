import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
//import "./styles.css";
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";


export default class Logout extends React.PureComponent {


    constructor(props) {
        super(props);
        this.state = {loggedIn:false, app: props.app};
     }

     checkIfLoggedIn() {
       
     }

     componentDidMount() {
        fetch('/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loggedIn: true });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loggedIn: false });
        });
    }



    handleLogut() {
        axios.post('/logout', {})
          .then(function (response) {
            if (response.status===200) { 
              this.props.history.push("/");
              console.log("got token");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

  render() {

    return (
      <Paper className="paper">
          <Button className="button" onClick={this.handleLogut}>Submit</Button>
      </Paper>
    )
  }
}
