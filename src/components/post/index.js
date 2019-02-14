import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import "./styles.css";
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import ThumbUp from '@material-ui/icons/ThumbUpSharp';



export default class Post extends PureComponent {
  

     render() {
         console.log(" i render ");
        return (
            <div className="post">
            <div className="post_left">
              <h2 className='title'> {this.props.title} </h2>
                <img className="image" src={this.props.url}/>
                <p className="">  </p>
               {/*  <Button className="">Like</Button> */}
            </div>
              
              <div className="post_right">
              <div className="count">{this.props.likes}</div>
              <div className="post_like">
              
              <Button onClick={this.props.like}><ThumbUp/></Button>
                
              </div>
              <div>
                  <p>author: <br/> {this.props.author}</p>
              </div>
              </div>
              <div className="post_tags">Tags: {this.props.tags}</div>
            </div>
        );
    }

    }

