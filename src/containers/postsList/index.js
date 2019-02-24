import React from "react";
import api from "../../api";
import Post from "../../components/post";
import "./styles.css";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class PostList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            posts: [],
            error: false,
        };
    }

    loadData() {
        console.log("STATE AT LOAD DATA:",this.state);
        fetch(api.LOAD_PAGINATED_POSTS, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page: this.state.page
                })
            }).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        error: false
                    });
                    return response.json();
                } else {
                    this.setState({
                        error: true
                    });
                    return JSON.parse(null);
                }
            }).then((data) => {
                console.log('DATA:', data);
                if (data) {
                    this.setState({posts: data});
                    this.forceUpdate();
                }
            });
    }

    like() {
        if (this.props.app && this.props.app.user && this.props.app.user.username) {
          fetch(api.LIKE_POST, {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
             },
            body: JSON.stringify({_id: this.state.id, username: this.props.app.user.username})
          }).then( (response)=> {
              if (response.status===200) {
                this.setState({loading:false})
                this.props.showMessage("LIKED!");
              }
          }).then((data)=> {
            console.log('Created Gist:', data);
          });
        }
       }

    componentDidMount() {
        this.loadData();
    }

    nextPage() {
        this.setState({page: this.state.page+1, posts: []},
            ()=> {
                this.loadData();
            }
            );
    }
  
    previousPage() { 
        this.setState({page: this.state.page-1, posts: []},
            ()=> {
                this.loadData();
            }
            );
    }
  
    firstPage() {
        this.setState({page: 0, posts: []},
            ()=> {
                this.loadData();
            }
            );
    }
  

    render() {

        const StyledButton = withStyles({
            root: {
              margin: '15px',
            }
          })(Button);

        const renderContent = (posts) => posts.map(post=>{
            return(
                <Post title={post.title}
                 url={post.url} author={post.author} 
                tags={post.tags} likes={post.likes} 
                like={()=> this.like()} match= {this.props.match} id={post._id}/>
            );
            });


        if (this.state.posts.length === 0) {
            return (<CircularProgress />);
        }

        return (


            <div className="fancy_wrapper"> 
                <div className="post_list">
                {renderContent(this.state.posts)}
                </div>
                <div className="button_group_posts" >
                    <StyledButton variant="contained" color="primary" onClick={()=>this.previousPage(false)}>Previous page</StyledButton>
                    <StyledButton variant="contained" color="secondary" onClick={()=>this.firstPage()}>First page</StyledButton>
                    <StyledButton variant="contained" color="primary" onClick={()=>this.nextPage(true)}>Next page</StyledButton>
                </div>
            </div>
            
        );
    }


    
}
