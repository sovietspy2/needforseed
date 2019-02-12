import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import "./styles.css";
import FormControl from '@material-ui/core/FormControl';



export default class Login extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {username: null, password: null, app: props.app};
     }
    
     handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        //this.props.stateChanger({appName:event.target.value});
        console.log("SUCC")
      };


     handleSubmit = (event) => {
        event.preventDefault();
        const self = this;
        console.log(this.state.username, this.state.password);
        console.log("uh oh submitted");
        axios.post('/api/authenticate', {
          credentials: 'include',  
          username: this.state.username,
          password: this.state.password
        })
        .then(function (response) {
          console.log(response);
          if (response.status===200) { 
            self.props.stateChanger("user", ({username:self.state.username}));
            console.log("got token");
            self.props.history.push("/home");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        
     }

  render() {

    return (
      <Paper className="paper">
        <form className="form" onSubmit={this.handleSubmit}>
              <h2> Login </h2>
              <TextField className="textfield" label="username" onChange={this.handleChange("username")} />
              <TextField className="textfield"  label="password" type="password" onChange={this.handleChange("password")} />                 
          <Button className="button" type="submit">Login</Button>
        </form>
      </Paper>
    )
  }
}
