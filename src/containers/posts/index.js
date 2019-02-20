import React from "react";
import Post from "../../components/post";
import Button from '@material-ui/core/Button';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import api from "../../api";
import CommentList from "../../components/commentList";

import { withStyles } from '@material-ui/core/styles';
import CreateComment from "../../components/createComment";

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
        comments: [],
        comment: "",
    };
  }

  isLoggedIn() {
    return this.props.app && this.props.app.user && this.props.app.user.username;
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
            //this.state.loading=false;
            this.setState({loading:false})
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
            state=self.extractData(state, post);
          });
          self.forceUpdate();
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  extractData(state, post) {
    state.id = post._id;
    state.title= post.title;
    state.url= post.url;
    state.author= post.author;
    state.tags=post.tags;
    state.likes=post.likes;
    state.comments = post.comments;
    state.comment = '';
    state.liked=false;
    return state;
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
          state=self.extractData(state, post);
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

  handleChange(name, event) {
    console.log(this.state.comment);
    if (event) {
      this.setState({ [name]: event.target.value });
    }
}

  handleCommentSave() {

    const currentTime =  new Date();
    const thisFuckinApp = this;
    const payload = {
      id: this.state.id,
      text: this.state.comment,
      username: this.props.app.user.username,
      date: currentTime,
    };
    this.setState({comment: null});
    this.setState({comments: null});
    fetch(api.SAVE_COMMENT, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
       },
      body: JSON.stringify({payload: payload})
    }).then( (response)=> {
        if (response.status===200) {
            thisFuckinApp.reloadComments();
        }
    });
    
  }

  reloadComments() {
    fetch(api.LOAD_COMMENTS,{
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
       },
      body: JSON.stringify({_id: this.state.id})})
    .then(res => res.json())
    .then(data=> {
        this.setState({comments: data});
    });
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
        tags={this.state.tags} likes={this.state.likes} like={()=> this.like()}/>
        </div> : <CircularProgress /> }
        <h2>Comments:</h2><hr/>
        { this.isLoggedIn() ? <CreateComment  value={this.state.comment} handleChange={(e) => this.handleChange("comment", e)} handleClick={()=> this.handleCommentSave()}/> : null}
        {this.state.comments ? <CommentList comments={this.state.comments} /> : <CircularProgress />}
      </div>
    );
  }
 

}