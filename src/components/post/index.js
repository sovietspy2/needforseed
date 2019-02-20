import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import "./styles.css";
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import ThumbUp from '@material-ui/icons/ThumbUpSharp';
import CircularProgress from '@material-ui/core/CircularProgress';


export default class Post extends PureComponent {
  
      constructor(props) {
        super(props);
        this.state = {
          loading: false,
        }
      }

      componentDidMount() {
        this.setState({loading:true});
      }

     render() {
         console.log(" i render ");
        return (
            <div className="post">
      
              <h2 className='title'> {this.props.title} </h2>
                <img 
                  onLoad={()=> console.log("IMG LOADED")}
                  className="image" src={this.props.url}/> 
                <p className="">  </p>
               {/*  <Button className="">Like</Button> */}
            
            <div className="post_bottom" >
              <div className="post_likes">  
              {this.props.likes}
              <Button onClick={this.props.like}><ThumbUp/></Button>
                
              </div>
              <div className="post_author">
                  <p>author: {this.props.author}</p>
              </div>
              </div>
              <div className="post_tags">Tags: {this.props.tags}</div>
            </div>
        );
    }

    }

