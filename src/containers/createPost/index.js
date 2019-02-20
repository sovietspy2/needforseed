import React from "react";
//import "./styles.css"
import Button from '@material-ui/core/Button';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import "./styles.css";
import Icon from '@material-ui/icons/CloudUpload';
import Select from "@material-ui/core/Select";
import Chip from '@material-ui/core/Chip';
import FormControl from "@material-ui/core/FormControl";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from "@material-ui/core/Input"
import api from "../../api";

import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { amber } from '@material-ui/core/colors/amber';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Home extends React.PureComponent{

    constructor(props) {
        super(props);
        this.state = {file: null,
            imagePreviewUrl: '', 
            title: '', 
            author: props.app.user.username,
             cathegory: '', 
             tags: '',
             loading: false,
             url: '',
            };
      }

      handleChange = name => event => {
          console.log(this.state);
        this.setState({ [name]: event.target.value });
      }
    
      _handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        let self =this;
        // TODO: do something with -> this.state.file
        const config = {
            hostname: 'api.imgur.com',
            path: '/3/image',
            baseURL: 'https://api.imgur.com',
            headers: {
              'Authorization': 'Client-ID 61a7212ebadbe4c'
            }
        };
        self.setState({loading:true})
        axios.post('https://api.imgur.com/3/image', this.state.file, config)
            .then((response) => {
              if (response.status===200) {
                console.log(response);
                self.setState({url:response.data.data.link})
                self.handleSave();
              } else {
                this.props.showMessage("Error occurred during upload! Try again!");
              }
             
            }).catch((error) => {
                this.props.showMessage("Error occurred during upload! Try again!");
              //handle error
            });
        console.log('handle uploading-', this.state.file);
      }
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

      handleSave() { 
          if (!this.state.file) {
              this.props.showMessage("ERROR! No image to upload! Try again!");
              return;
          }
          const payload = {
            currentTime: new Date( new Date().getTime() + (new Date().getTimezoneOffset() * 60000)),
            author: this.state.author,
            title: this.state.title,
            cathegory: this.state.cathegory,
            url: this.state.url,
            tags: this.state.tags,
            comments: [],
          };
          this.savePost(payload);
          
      }

      savePost(payload) {
        debugger;
        console.log("STATE I HAVE N SAVE POST:",this.state);
        fetch(api.SAVE_POST, {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
           },
          body: JSON.stringify({payload: payload})
        }).then( (response)=> {
            if (response.status===200) {
              this.state.loading=false;
              this.props.showMessage("Upload succesful!");
            }
        }).then((data)=> {
          console.log('Created Gist:', data);
        });
      }
    
      render() {

        if (this.state.loading) {
          return (
            <div className="loading_wrapper">
               <CircularProgress color="secondary" />
            </div>
           );
        }


        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img className="create_post_img" src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
          
        return (

            

             <div className="image_creation_container">
             <div className="post_creation_fields">
            <TextField className="textfield" margin="normal" variant="outlined" label="Post name" value={this.state.title} onChange={this.handleChange("title")} />
            <TextField className="textfield"  label="tags" margin="normal" variant="outlined" value={this.state.tags} onChange={this.handleChange("tags")} />  
            
                <FormControl >
                <InputLabel className="cathegory_select" htmlFor="cathegory-customized-select" >
                    Cathegory
                </InputLabel>
                <Select
                    className='select_cat'
                    value={this.state.cathegory}
                    onChange={this.handleChange("cathegory")}
                    input={<Input name="cat" id="cathegory-customized-select" />}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={"ACTION"}>Action</MenuItem>
                    <MenuItem value={"FILM"}>Film</MenuItem>
                    <MenuItem value={"FAN ART"}>Fan art</MenuItem>
                    <MenuItem value={"MEME"}>Meme</MenuItem>
                </Select>
                </FormControl>
        </div>
          <div className="previewComponent">
            <form onSubmit={(e)=>this._handleSubmit(e)}>
            <Button color="primary" component="label">
            
            <Icon />
            Pick file
                <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e)=>this._handleImageChange(e)}
                     />
            </Button>

              <Button color="primary"className="submitButton" 
                type="submit" 
                onClick={(e)=>this._handleSubmit(e)}>Create Post</Button>
            </form>
            <div className="imgPreview">
              {$imagePreview}
            </div>
             
          </div>
       
              
          </div>
        )
      }
 }