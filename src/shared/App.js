import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ContentBody, Editor } from 'pages';
import { TopNavbar, BtmFooter } from 'components';

class App extends Component {
  state = {
    tmp: '',
  }
  render() {
    return (
      <div>
        <Route path="/" component={TopNavbar} />
        <Route exact path="/" component={ContentBody} />
        <Route path="/editor" component={Editor} />
        <Route path="/" component={BtmFooter} />
      </div>
    );
  }
}

export default App;
