import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import "./styles.css";
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import api from "../../api";



export default class Register extends PureComponent {

      constructor() {
        super();
        this.state = {
          username: '',
          password: '',
          email: '',
          usernameError: false,
          passwordError: false,
          emailError: false
          };
     }
     handleChange(name, event) {
      if (event) {
        this.setState({ [name]: event.target.value });
      }
      console.log("CHANGE VEENT");
  }


     handleSubmit() {
        this.register();
        console.log(this.state.username, this.state.password);
        console.log("uh oh submitted");
     }

     validateEmail() {
       const email = this.state.email;
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(email)) {
        console.log("EMAIL OK");
        this.setState(state=> {
          state.emailError=false;
          return state;
        });
        this.register();
      } else {
      
        this.setState(state=> {
          state.emailError=true;
          return state;
        });
        this.forceUpdate();
      }
    }

    validateUsername() {
      console.log("USERNAME",this.state.username);
      const self = this;
      fetch(api.VALIDATE_USERNAME,
      {
        method: 'POST',
        headers: {
           'Accept': 'application/json',
            'Content-Type': 'application/json'
                 },
        body: JSON.stringify({username:this.state.username})
      })
      .then(res => {
        console.log("EMAIL VALIDATON RESPONSE",res);
        if (res.status === 200) {
          self.setState(state=> {
            state.usernameError=false;
            return state;
          });
            this.validateEmail();
        } else {
            console.log("nem sikerult valudalni");
            self.setState(state=> {
            state.usernameError=true;
            return state;
          }); 
          self.forceUpdate();
        }
      })
      .catch(err => {
        console.error("MI A FASZ",err);
      });    
    }

    handleSave() {
        this.validateUsername();
        this.clearValues();
    }
    

     register() {
       
        axios.post(api.REGISTER, {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
          })
          .then(function (response) {
            console.log("REFISTER SUCC:",response);

          })
          .catch(function (error) {
            console.log(error);
          });
     }

     clearValues() {
      this.setState(state=> {
        state.username='';
        state.password='';
        state.email='';
        state.usernameError= false;
        state.passwordError= false;
        state.emailError= false;
        return state;
      }); 
      this.forceUpdate();
      console.log("cleared");
    }

  render() {

    return (
     <div>
      <h2>Registration form</h2>
     <div className="fields_in_register">
        <TextField error={this.state.usernameError} value={this.state.username} name="username"  label="username"  onChange={(e) => this.handleChange("username", e)}/>
      </div>
      <div className="fields_in_register">
        <TextField error={this.state.emailError} value={this.state.email} name="email"  label="email address"  onChange={(e) => this.handleChange("email", e)}/>
      </div>
      <div className="fields_in_register">
        <TextField error={this.state.passwordError} value={this.state.password} name="password" type="password" label="password"  onChange={(e) => this.handleChange("password", e)} />
      </div>
      <div className="buttons_in_register" >
        <Button variant="contained" onClick={()=>this.handleSave()}>Submit</Button>
        </div>
        <div className="buttons_in_register">
        <Button  variant="contained" onClick={()=>this.clearValues()}>
          Clear Values
        </Button>
      </div>
    </div>
    );



   /*  return (
      <Paper className="paper">
      <form className="form" onSubmit={this.handleSubmit}>
            <h2> Register </h2>
            <TextField className="textfield" label="username" onChange={this.handleChange("username")} />
            <TextField className="textfield"  label="password" type="password" onChange={this.handleChange("password")} />                 
        <Button className="button" variant="contained" type="submit">Submit</Button>
      </form>
    </Paper>
    ) */
  }
}
