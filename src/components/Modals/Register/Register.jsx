import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';
import styles from './Register.scss';

const cx = classNames.bind(styles);

/*

  prop = modalModify: 모달의 상태를 받아서 변경하는 함수

*/

class Register extends Component {
  state = {
    userRegData: {
      username: '',
      password: '',
      tags: '',
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
      userRegData: Object.assign({}, ...prevState.userRegData, { [name]: value }),
    }));
  }

  handleSelectChange = (selectedOption) => {
    this.setState(prevState => ({
      userRegData: {
        ...[prevState.userRegData],
        tags: selectedOption,
      },
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
          <div className={cx('register-modal-contents')}>
            <div style={{
              fontSize: '1.3rem',
              padding: '20px',
              paddingBottom: '50px',
              textAlign: 'center',
              }}
            >
              LiFiD에 오신 것을 환영합니다.
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username
                <br />
                <input
                  className={cx('text-input')}
                  id="username"
                  name="username"
                  onChange={handleChange}
                  placeholder="아이디를 입력해주세요"
                  required
                />
              </label>
              <br />
              <label htmlFor="password">
                Password
                <br />
                <input
                  className={cx('text-input')}
                  id="passoword"
                  name="password"
                  onChange={handleChange}
                  placeholder="비밀번호를 입력해주세요"
                  required
                />
              </label>
              <br />
              <label htmlFor="tags">
                Tags
                <br />
                <Select
                  className={cx('tags')}
                  value={this.state.userRegData.tags}
                  onChange={this.handleSelectChange}
                  multi
                  options={[
                    { value: 'SF', label: 'SF' },
                    { value: 'Romance', label: 'Romance' },
                  ]}
                />
                <span className={cx('tag-text')}>
                설정한 tag에 따라서 메인 페이지에 선호한 컨텐츠가 표시됩니다.<br />
                이는 나중에 변경할 수 있습니다.
                </span>
              </label>
              <br />
              <label htmlFor="description">
                Description
                <br />
                <input
                  className={cx('text-input')}
                  id="description"
                  name="description"
                  onChange={handleChange}
                  placeholder="간략한 자기소개를 입력해주세요"
                />
              </label>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px' }}>
                <Button className="pt-minimal pt-intent-success" text="Submit" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  modalModify: PropTypes.func.isRequired,
};

export default Register;
