import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import "./styles.css";
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";


export default class Register extends PureComponent {


    constructor() {
        super();
        this.state = {username: null, password: null};
     }
    
     handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };


     handleSubmit = (event) => {
        event.preventDefault();
        this.register();
        console.log(this.state.username, this.state.password);
        console.log("uh oh submitted");
     }

     register() {
        axios.post('/api/register', {
            username: this.state.username,
            password: this.state.password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
     }

  render() {
    return (
      <Paper className="paper">
      <form className="form" onSubmit={this.handleSubmit}>
            <h2> Register </h2>
            <TextField className="textfield" label="username" onChange={this.handleChange("username")} />
            <TextField className="textfield"  label="password" type="password" onChange={this.handleChange("password")} />                 
        <Button className="button" type="submit">Submit</Button>
      </form>
    </Paper>
    )
  }
}
