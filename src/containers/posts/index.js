import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class posts extends Component {
  
    constructor(props) {
      super(props);

      this.state = {
        message:"not fetched",
        appName: props.appName
      }

      console.log(this.state);
    }
    
    componentDidMount() {
      //GET message from server using fetch api
      fetch('/api/secret')
        .then(res => res.text())
        .then(res => this.setState({message: res}));
    }


  render() {

    //this.setState({appName:this.props.match.params.postId});

    //this.props.extra = this.props.match.params.postId;

      console.log(this.props);
    return (
      <div>
        {this.state.message}
        {this.props.match.params.postId}
        
      </div>
    )
  }
}
