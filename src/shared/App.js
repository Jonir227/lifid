import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import classNames from 'classnames/bind';
import { ContentBody, Editor } from 'pages';
import { TopNavbar, BtmFooter } from 'components';
import styles from 'styles/base.scss';

const cx = classNames.bind(styles);

class App extends Component {
  state = {
    tmp: '',
  }
  render() {
    return (
      <Fragment>
        <Route path="/" component={TopNavbar} />
        <div className={cx('content-body')}>
          <Route exact path="/" component={ContentBody} />
          <Route path="/editor" component={Editor} />
          <Route path="/" component={BtmFooter} />
        </div>
      </Fragment>
    );
  }
}

export default App;
