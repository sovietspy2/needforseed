import React from "react";
import Post from "../../components/post";
import Button from '@material-ui/core/Button';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Posts extends React.PureComponent{

  constructor(props) {
    super(props); 
    this.state = {
        id: null,
        url: null,
        title: null,
        author: null,
    };
  }

  loadNextPost(order) {
      if (!this.state.id) {
        return;
      }

      const url = order ? "/api/nextPost" : "/api/previousPost";
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
        const post = response.data[0];
        if (post) {
          self.setState(state=> {
            state.id = post._id;
            state.title= post.title;
            state.url= post.url;
            state.author= post.author;
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
    debugger;
    const self = this;
    axios.get('/api/lastPost', {
    })
    .then(function (response) {
      console.log(response);
      const post = response.data[0];
      if (post) {
        self.setState(state=> {
          state.id = post._id;
          state.title= post.title;
          state.url= post.url;
          state.author= post.author;
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

    console.log("home rneder", this.state);
    
    return (
      <header className="App-header">
      <h1> POSTS </h1>
      
      {this.state.url ? <Post title={this.state.title} url={this.state.url} author={this.state.author}/> :
      <CircularProgress /> }
      <div>
           <Button  variant="contained" color="primary" onClick={()=>this.loadNextPost(false)}>Previous</Button>
           <Button  variant="contained" color="secondary" onClick={()=>this.loadLastPost()}>LATEST POST</Button>
           <Button  variant="contained" color="primary" onClick={()=>this.loadNextPost(true)}>Next</Button>
      </div>
         
    {/* <List stateChanger={this.props.stateChanger}/> */}
    hello there
    </header>
    );
  }
 

}