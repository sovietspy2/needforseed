import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import "./styles.css";
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import Typography from '@material-ui/core/Typography';


export default class Post extends PureComponent {
  

     like() {
        axios.post('nutting', {
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
         console.log(" i render ");
        return (
            <div className="post">
                <h2 className='title'> {this.props.title} </h2>
                <img className="image" src={this.props.url}/>
                <p className=""> {this.props.author} </p>
               {/*  <Button className="">Like</Button> */}
            </div>
        );
    }

    }

