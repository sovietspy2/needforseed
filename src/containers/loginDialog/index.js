import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { Redirect } from "react-router-dom";
import api from "../../api";


class LoginDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            username: null,
            password: null,
            error: "",
          };
    }

  handleChange(name, event) {
      if (event) {
        this.setState({ [name]: event.target.value });
      }
    console.log("CHANGE");
    
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const self = this;
    console.log(this.state.username, this.state.password);
    console.log("uh oh submitted");
    axios.post(api.LOGIN, {
      username: this.state.username,
      password: this.state.password
    })
    .then(function (response) {
      console.log(response);
      if (response.status===200) { 
        self.props.stateChanger("user", ({username:self.state.username}));
        console.log("got token");
        self.props.handleClose();
        self.props.showMessage("Logged in!");
        self.state.error="";
      }
    })
    .catch(function (error) {
      self.state.error = "login error";
      self.props.showMessage("Authentication failed! Try again!");
      console.log(error);
    });
    
 }

  render() {

    if (this.props.app && this.props.app.user && this.props.app.user.username) {
        console.log("not rendered login dialog becuase user is logged in");
        return null;
    }


      console.log("LOGIN DIALOG STATE",this.state); 
      console.log("login dialogs PROPS ",this.props);
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={()=> {this.state.error = ''; this.props.handleClose()}}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">Login</DialogTitle>
          <DialogContent>                  
                    <TextField error={this.state.error.length>0} className="textfield" label="username" onChange={(e) => this.handleChange("username", e)} />
                    <TextField error={this.state.error.length>0} className="textfield"  label="password" type="password" onChange={(e) => this.handleChange("password", e)} />                 
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> {this.state.error = ''; this.props.handleClose() }} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LoginDialog;