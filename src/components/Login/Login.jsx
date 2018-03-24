import React, { Component } from 'react';
import ClassNames from 'classnames/bind';
import { Button, Icon, FocusStyleManager } from '@blueprintjs/core';
import styles from './Login.scss';

const cx = ClassNames.bind(styles);

class Login extends Component {
  state = {
    loginVal: {
      username: '',
      password: '',
    },
  }

  handleUserNameChange = (event) => {
    this.setState(prevState => ({
      loginVal: {
        username: event.target.value,
        password: prevState.loginVal.password,
      },
    }));
  }

  handlePasswordChange = (event) => {
    this.setState(prevState => ({
      loginVal: {
        username: prevState.loginVal.username,
        password: event.target.value,
      },
    }));
  }

  loginRequst = (event) => {
    console.log(this.state.loginVal);
    event.preventDefault();
  }

  render() {
    const {
      onLoginClick,
    } = this.props;

    FocusStyleManager.onlyShowFocusOnTabs();

    return (
      <div className={cx('login-background')}>
        <div className={cx('login-modal')}>
          <div className={cx('exit-wrapper')}>
            <Button className="pt-minimal" icon="cross" onClick={onLoginClick} />
          </div>
          <div className={cx('modal-contents')}>
            <div className={cx('login-banner')}>
              <h1>LiFiD</h1>
              <h4>
                LiFiD에서 매일 새로운 소설을 쓰고,<br />매일 새로운 소설을 읽어 보세요.
              </h4>
            </div>
            <form className={cx('login-input-fields')} onSubmit={this.loginRequst}>
              <div style={{ fontSize: '1.3rem' }}><strong>Username</strong></div>
              <input type="text" className={cx('text-input')} onChange={this.handleUserNameChange} placeholder="Enter Username" required />
              <div style={{ fontSize: '1.3rem' }}><strong>Password</strong></div>
              <input type="password" className={cx('text-input')} onChange={this.handlePasswordChange} placeholder="Enter Password" required />
              <div>
                <Button className="pt-minimal pt-intent-success" text="Log In" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
