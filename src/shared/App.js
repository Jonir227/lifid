import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import classNames from 'classnames/bind';
import { ContentBody, Editor, ReaderView } from 'pages';
import { TopNavbar, BtmFooter, Login } from 'components';
import styles from 'styles/base.scss';

const cx = classNames.bind(styles);

class App extends Component {
  // isLoginOpen 상태에 따라서 Login component의 랜더링 여부 결정.
  state = {
    isLoginOpen: false,
  }
  openLogin = () => {
    this.setState(prevState => ({
      isLoginOpen: !prevState.isLoginOpen,
    }));
  }
  render() {
    return (
      <Fragment>
        <TopNavbar onLoginClick={this.openLogin} />
        <div className={cx('content-body')}>
          <Route exact path="/" component={ContentBody} />
          <Route exact path="/editor" component={Editor} />
          <Route exact path="/reader" component={ReaderView} />
          <Route path="/" component={BtmFooter} />
        </div>
        {
          this.state.isLoginOpen ?
            <Login onLoginClick={this.openLogin} />
          :
            <span />
        }
      </Fragment>
    );
  }
}

export default App;
