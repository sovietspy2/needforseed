import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import api from "../api";

export default function withAuth(ComponentToProtect, app) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
      if (app.user === null || app.user === undefined) {
        this.setState({redirect: true});
      }

      fetch(api.CHECK_TOKEN, {credentials: 'include'})
      .then(res => {
        if (res.status === 200) {
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false, redirect: true });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/auth" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}