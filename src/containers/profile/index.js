import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';

export default class Profile extends React.PureComponent {
  
    constructor(props) {
      super(props);

      this.state = {
        message:"not fetched",
        app: props.app
      };

      console.log(this.state);
    }

    updateState = (key, value) => {
        // not allowed AND not working
        this.setState(state => {
          const list = state.list.push(state.value);
    
          return {
            list,
            value: '',
          };
        });
      };

      modifyState() {
          console.log("changing state");
          this.props.stateChanger("HELLO THERE CHANGES STATE WITH BUTTON");
      }
    
  render() {

    //this.setState({appName:this.props.match.params.postId});

    //this.props.extra = this.props.match.params.postId;

      console.log(this.state);
    return (
      <div>
          <Button onClick={this.modifyState.bind(this)}>MODIFY STATE</Button>
      </div>
    )
  }
}
