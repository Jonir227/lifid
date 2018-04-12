import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Button, Intent } from '@blueprintjs/core';
import axios from 'axios';
import { AppToaster } from 'components';
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
    event.preventDefault();
    axios.post('/api/auth/login', this.state.loginVal)
      .then((response) => {
        const { token, userData } = response.data;
        localStorage.setItem('token', token);
        AppToaster.show({
          message: '환영합니다',
          intent: Intent.SUCCESS,
        });
        console.log(userData);
        this.props.login(userData);
        this.props.modalModify('Exit');
      })
      .catch((response) => {
        console.log(response);
        AppToaster.show({
          message: '아이디와 비밀번호를 확인해주세요',
          intent: Intent.DANGER,
        });
      });
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
              <div style={{ fontWeight: '400', fontSize: '3rem' }}>LiFiD</div>
              <div style={{ fontWeight: '200', fontSize: '1.3rem' }}>
                LiFiD에서 매일 새로운 소설을 쓰고,<br />매일 새로운 소설을 읽어 보세요.
              </div>
            </div>
            <form className={cx('login-input-fields')} onSubmit={loginRequest}>
              <div style={{ fontSize: '1.3rem', fontWeight: '400' }}>Username</div>
              <input
                type="text"
                name="username"
                className={cx('text-input')}
                onChange={handleChange}
                placeholder="Enter Username"
                required
              />
              <div style={{ fontSize: '1.3rem', fontWeight: '400' }}>Password</div>
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
  login: PropTypes.func.isRequired,
};

export default Login;
