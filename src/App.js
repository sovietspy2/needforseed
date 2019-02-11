import React, { Component } from 'react';

import './App.css';

import api from "./api";

import 'typeface-roboto';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Test from "./containers/pageTest";
import Home from "./containers/home/index";
import Login from "./containers/loginPage";
import Posts from "./containers/posts";
import Register from "./containers/register";
import withAuth from './helpers/withAuth';
import Logout from "./containers/logout";
import Profile from "./containers/profile";
import LoginDialog from "./containers/loginDialog";
import axios from "axios";
import CreatePost from "./containers/createPost";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { browserHistory } from 'react-router';

import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import CustomizedSnackbar from "./components/snackbar";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      app: [],
      loginDialogOpen: false,
      snakBar: {
        open: false,
        message: "none"
      }
    };
    this.openLogin = this.openLogin.bind(this);
  }

 

  render() {

    let helloText = "TEST DEFAULT VALUE"
    console.log("APP STATE:",this.state);

    const LogoutWithAuth = withAuth(Logout, this.state.app);
    const CreatePostWithAuth = withAuth(CreatePost, this.state.app);

    return (
      
      <div className="App">

        <CustomizedSnackbar handleClose={()=>this.closeSnakBar()} open={this.state.snakBar.open} message={this.state.snakBar.message} />
        <LoginDialog {...this.props} open={this.state.loginDialogOpen} app={this.state.app}
         handleClose={() => this.closeLogin() } showMessage={ (message)=> this.showMessage(message)} stateChanger={ this.stateChanger.bind(this)} leavePage={()=>this.navigateToFrontPage()}/>


        <Router>
      <div>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className="grow">
            MyApp
          </Typography>
      
          {!this.state.app.user ? <Button className="menuButton" variant="contained" onClick={this.openLogin} >Login</Button> : null}
          {!this.state.app.user ?  <Button className="menuButton" variant="contained" component={Link} to="/register" >Register</Button> : null}
            <Button className="menuButton" variant="contained" component={Link} to="/" >Home</Button>
          {this.state.app.user ? <Button className="menuButton" variant="contained" onClick={() => this.handleLogut()} >logout</Button> : null}
            <Button className="menuButton" variant="contained" component={Link} to="/posts" >Posts</Button>
            {this.state.app.user ?  <Button className="menuButton" variant="contained" component={Link} to="/profile" >Profile</Button> : null}
            {this.state.app.user ?  <Button className="menuButton" variant="contained" component={Link} to="/upload" >create post </Button> : null}
            
        </Toolbar>
      </AppBar>

      


        <Route path="/posts/:postId" render={props => <Posts {...props} extra={helloText} appName={this.state.appName}/>} />
        <Route path="/posts" render={props => <Posts {...props} app={this.state.app} stateChanger={ ()=>this.stateChanger} showMessage={ (message)=> this.showMessage(message)} />} />
        <Route path="/register" component={Register} showMessage={ (message)=> this.showMessage(message)} />
         <Route path="/upload" render={props => <CreatePostWithAuth app={this.state.app} showMessage={ (message)=> this.showMessage(message)}  />} />
        <Route path="/test" render={props => <Test {...props} app={this.state.app} stateChanger={ ()=>this.stateChanger}/>} />
        {/* <Route path="/login" render={props=> <Login {...props} app={this.state.app} stateChanger={this.stateChanger.bind(this)} />} /> */}
        <Route path="/profile" render={props=> <Profile {...props} app={this.state.app} stateChanger={this.stateChanger.bind(this)} />} />
        <Route path="/logout" render={props=> <LogoutWithAuth {...props}  app={this.state.app} stateChanger={this.stateChanger.bind(this)} />} />
       

        <Route exact path="/" render={props=> <Home {...props} app={this.state.app} stateChanger={ ()=> this.stateChanger()} />} />
      </div>
    </Router>

    <BottomNavigation
        showLabels
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" onClick={this.bottomClick}icon={<LocationOnIcon />} />
      </BottomNavigation>
      </div>
    );
  }


  closeSnakBar() {
    this.setState(state => {
      state.snakBar.open = false;
      return state;
   });
  }

  stateChanger(key,value) {
    this.setState(state => {
       state.app[key] = value;
       return state;
    });
  }


  bottomClick() {
    console.log("CLICKED BOTTOM");
  }

  openLogin() {
    this.setState(state => {
      state.loginDialogOpen= true;
      return state;
    });
  }

  closeLogin() {
    this.setState(state => {
      state.loginDialogOpen= false;
      return state;
    });
  }

  showMessage(message) {
    this.setState(state => {
      state.snakBar.open=true;
      state.snakBar.message=message;
      return state;
    });
  }

  handleLogut() {
    const self = this;
    axios.post(api.LOGOUT, {})
      .then(function (response) {
        if (response.status===200) { 
          //this.props.history.push("/");
          self.setState({app: {
            user: null
          }
        });
          console.log("logged out");
          self.setState(state => {
            state.snakBar.open = true;
            state.snakBar.message = "Logged out!";
            return state;
         });

        }
      })
      .catch(function (error) {
        console.log(error);
      });
}


}

export default App;

//<Route path="/secret" component={withAuth(Secret)} /> 