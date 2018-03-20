import React, { Component } from 'react';
import { Card } from '@blueprintjs/core';

class Login extends Component {
  state = {
    login: '',
  }
  render() {
    return (
      <Card>
        Log in is here
        {this.state.login}
      </Card>
    );
  }
}

export default Login;
