import React from "react";
import Post from "../../components/post";
import Button from '@material-ui/core/Button';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import api from "../../api";

import { withStyles } from '@material-ui/core/styles';

export default class Posts extends React.PureComponent{

  constructor(props) {
    super(props); 
    this.state = {
        id: null,
        url: null,
        title: null,
        author: null,
        tags: null,
        liked: false,
    };
  }

  like() {
    if (this.props.app && this.props.app.user && this.props.app.user.username && !this.state.liked) {
      fetch(api.LIKE_POST, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
         },
        body: JSON.stringify({_id: this.state.id, username: this.props.app.user.username})
      }).then( (response)=> {
          if (response.status===200) {
            this.state.loading=false;
            this.props.showMessage("LIKED!");
            this.setState({liked:true});
            this.setState({likes:this.state.likes+1});
          }
      }).then((data)=> {
        console.log('Created Gist:', data);
      });
    }
   }

  loadNextPost(order) {
      if (!this.state.id) {
        return;
      }

      const url = order ? api.NEXT_POST : api.PREVIOUS_POST;
      const self = this;
      console.log("SELF STATE ID:",self.state.id);
      axios.get(url, {
        params: {
          id: self.state.id,
          order: order,
        }
        
      })
      .then(function (response) {
        console.log(response);
        const post = response.data;
        if (post) {
          self.setState(state=> {
            state.id = post._id;
            state.title= post.title;
            state.url= post.url;
            state.author= post.author;
            state.tags=post.tags;
            state.likes=post.likes;
            state.liked=false;
            return state;
          });
          self.forceUpdate();
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }



  loadLastPost() {
    const self = this;
    axios.get(api.LATEST_POST, {
    })
    .then(function (response) {
      console.log(response);
      const post = response.data;
      if (post) {
        self.setState(state=> {
          state.id = post._id;
          state.title= post.title;
          state.url= post.url;
          state.author= post.author;
          state.tags=post.tags;
          state.likes=post.likes;
          state.liked=false;
          return state;
        });
        self.forceUpdate();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() { 
    this.loadLastPost();
  }

 

  render() {

    const StyledButton = withStyles({
      root: {
        margin: '15px',
      }
    })(Button);
    console.log("home rneder", this.state);
    
    return (
      <div className="post_paper">
          <div className="button_group_posts" >
            <StyledButton variant="contained" color="primary" onClick={()=>this.loadNextPost(false)}>Previous</StyledButton>
            <StyledButton variant="contained" color="secondary" onClick={()=>this.loadLastPost()}>LATEST POST</StyledButton>
            <StyledButton variant="contained" color="primary" onClick={()=>this.loadNextPost(true)}>Next</StyledButton>
        </div>

        {this.state.url ? <div className="mypost"><Post title={this.state.title} url={this.state.url} author={this.state.author} 
        tags={this.state.tags} likes={this.state.likes} like={()=> this.like()}/></div> :
        <CircularProgress /> }
      </div>
    );
  }
 

}