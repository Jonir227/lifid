import React, { Component } from 'react';
import ClassNames from 'classnames/bind';
import { Button, Icon, FocusStyleManager } from '@blueprintjs/core';
import styles from './Login.scss';

const cx = ClassNames.bind(styles);

class Login extends Component {
  state = {
    userIdentifier: {
      id: '',
      password: '',
    },
  }

  render() {
    const {
      onLoginClick,
    } = this.props;

    FocusStyleManager.onlyShowFocusOnTabs();

    return (
      <div className={cx('login-background')}>
        <div className={cx('login-modal')}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button className={cx('exit-button pt-minimal')} icon="cross" onClick={onLoginClick} />
          </div>
          <div>
            <div className={cx('modal-contents')}>
              <div className={cx('login-banner')}>
                LiFiD에서 매일 새로운 글을 쓰고, 매일 새로운 글을 읽어 보세요.
              </div>
              <div className={cx('login-input-fields')}>
                <input />
                <br />
                <input />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
