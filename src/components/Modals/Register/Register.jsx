import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import classNames from 'classnames/bind';
import styles from './Register.scss';

const cx = classNames.bind(styles);

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
    console.log(this.state.userRegData);
    event.preventDefault();
  }

  render() {
    const {
      handleSubmit,
      handleChange,
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
                <input id="passoword" name="password" onChange={handleChange} />
              </label>
              <br />
              <label htmlFor="tags">
                Tags
                <br />
                <input id="tags" name="tags" onChange={handleChange} />
                설정한 tag에 따라서 메인 페이지에 선호한 컨텐츠가 표시됩니다. 이는 나중에 변경할 수 있습니다.
              </label>
              <br />
              <label htmlFor="password">
                Password
                <br />
                <input id="passoword" name="password" onChange={handleChange} />
              </label>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
