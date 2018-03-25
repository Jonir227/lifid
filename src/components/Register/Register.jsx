import React, { Component } from 'react';
import { Card } from '@blueprintjs/core';

class Register extends Component {
  state = {
    userRegData: {
      username: '',
      password: '',
      tags: [],
      profilePicture: '',
      description: '',
    },
  }

  handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    this.setState(prevState => ({
      userRegData: Object.assign({}, prevState.userRegData, { [name]: value }),
    }));
  }

  handleSubmit = (event) => {
    console.log('submitted');
    event.preventDefault();
  }

  render() {
    const {
      handleSubmit,
      handleChange,
    } = this;
    return (
      <Card>
        <h1>LiFiD에 오신 것을 환영합니다.</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username
            <br />
            <input id="username" name="username" onChange={handleChange} />
          </label>
          <br />
          <label htmlFor="password">
            Password
            <br />
            <input id="passoword" name="password" onChnage={handleChange} />
          </label>
        </form>
      </Card>
    );
  }
}

export default Register;
