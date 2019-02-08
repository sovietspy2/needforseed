import styles from './style.css';
import React from "react";
import { Redirect } from 'react-router-dom';

export default class Test extends React.PureComponent {


  constructor(props) {
    super(props);

    this.state={
      app: props.app,
      loading:true,
      redirect: false
    }
    console.log(this.state);
  }

  //componentDidUpdate() {
 //   this.setState({app:this.props.app});
  //}

  componentDidMount() {

    fetch('/checkToken')
      .then(res => {
        if (res.status === 200) {
          this.setState({ loading: false });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      });
  }

  render() {
  console.log("state:",this.state);
  console.log("props:",this.props)
  const { loading, redirect } = this.state;

    if (loading) {
      return null;
    }
    if (redirect) {
      return <Redirect to="/login" />;
    }
  
    return (
       <div>   HEY HO</div>
    
    );
  }

}