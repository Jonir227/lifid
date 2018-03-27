import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import styles from './Login.scss';

const cx = ClassNames.bind(styles);

class Login extends Component {
  state = {
    loginVal: {
      username: '',
      password: '',
    },
  }

  handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;
    this.setState(prevState => ({
      loginVal: Object.assign(prevState.loginVal, { [name]: value }),
    }));
  }


  loginRequest = (event) => {
    console.log(this.state.loginVal);
    event.preventDefault();
  }

  render() {
    const {
      handleChange,
      loginRequest,
    } = this;

    const {
      modalModify,
    } = this.props;

    return (
      <div className={cx('modal-background')}>
        <div className={cx('modal-body')}>
          <div className={cx('exit-wrapper')}>
            <Button className="pt-minimal" icon="cross" onClick={() => { modalModify('Exit'); }} />
          </div>
          <div className={cx('modal-contents')}>
            <div className={cx('login-banner')}>
              <h1>LiFiD</h1>
              <h4>
                LiFiD에서 매일 새로운 소설을 쓰고,<br />매일 새로운 소설을 읽어 보세요.
              </h4>
            </div>
            <form className={cx('login-input-fields')} onSubmit={loginRequest}>
              <div style={{ fontSize: '1.3rem' }}><strong>Username</strong></div>
              <input
                type="text"
                name="username"
                className={cx('text-input')}
                onChange={handleChange}
                placeholder="Enter Username"
                required
              />
              <div style={{ fontSize: '1.3rem' }}><strong>Password</strong></div>
              <input
                type="password"
                name="password"
                className={cx('text-input')}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
              <div className={cx('button-area')}>
                <Button className="pt-minimal pt-intent-primary" text="register" onClick={() => { modalModify('Register'); }} />
                <Button className="pt-minimal pt-intent-success" text="Log In" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  modalModify: PropTypes.func.isRequired,
};

export default Login;
