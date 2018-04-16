import React, { Component } from 'react';
import { Button, Intent, Icon } from '@blueprintjs/core';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Select from 'react-select-plus';
import _ from 'lodash';
import axios from 'axios';
import { AppToaster } from 'components';
import 'react-select-plus/dist/react-select-plus.css';
import styles from './Register.scss';

const cx = classNames.bind(styles);

const FormCheck = ({ message, cn }) => (
  <span className={cx(cn)}>
    <Icon icon={(text => (text.includes('alright') ? 'tick' : 'cross'))(cn)} /> {message}
  </span>
);

FormCheck.propTypes = {
  cn: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

/*
  prop = modalModify: 모달의 상태를 받아서 변경하는 함수
*/
class Register extends Component {
  state = {
    isValidForm: {
      id: false,
      isExists: false,
      pw: false,
    },
    tagData: [],
    userRegData: {
      username: '',
      password: '',
      nickname: '',
      tags: '',
      profilePicture: '',
      description: '',
    },
  }

  componentDidMount() {
    axios.get('/api/tag/list')
      .then((response) => {
        const { tags } = response.data;
        this.setState({
          tagData: _.map(tags, tag => ({
            value: tag.name, label: tag.name,
          })),
        });
      });
  }

  handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;
    this.setState(prevState => ({
      userRegData: Object.assign({}, prevState.userRegData, { [name]: value }),
    }));
    if (name === 'username') {
      this.checkUserId();
    } else if (name === 'password') {
      this.checkPW();
    }
  }

  // id, password check in evry 250ms
  checkUserId = _.debounce(() => {
    const isValidEmail = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(this.state.userRegData.username);

    axios.post('/api/auth/check-user', this.state.userRegData)
      .then((response) => {
        const isExists = response.data.exists;
        this.setState({
          isValidForm: {
            id: isValidEmail && !isExists,
            isExists,
          },
        });
      });
  }, 250);

  checkPW = _.debounce(() => {
    const pwPattern = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;
    this.setState(prevState => ({
      isValidForm: {
        ...prevState.isValidForm,
        pw: pwPattern.test(this.state.userRegData.password),
      },
    }));
  }, 250);

  handleSelectChange = (selectedOption) => {
    this.setState(prevState => ({
      userRegData: Object.assign({}, prevState.userRegData, { tags: _.map(selectedOption, 'value') }),
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!(this.state.isValidForm.id && this.state.isValidForm.pw)) {
      AppToaster.show({
        message: '입력 폼을 다시 확인해주세요',
        intent: Intent.DANGER,
      });
      return;
    }
    const {
      userRegData,
    } = this.state;
    axios.post('/api/auth/register', {
      username: userRegData.username,
      password: userRegData.password,
      description: userRegData.description,
      tags: userRegData.tags,
    })
      .then((response) => {
        const { success } = response.data;
        if (success) {
          AppToaster.show({
            message: '회원가입에 성공했습니다',
            intent: Intent.PRIMARY,
            action: {
              onClick: () => {
                this.props.modalModify('Login');
              },
              text: '로그인',
            },
          });
          this.props.modalModify('Exit');
        } else {
          AppToaster.show({
            message: '실패했습니다. 다시 시도해 주세요',
            intent: Intent.DANGER,
          });
        }
      }).catch((error) => {
        const { status } = error.response;
        const { message } = error.response.data;
        AppToaster.show({
          intent: Intent.DANGER,
          message: `회원가입에 실패했습니다.
          ${status}: ${message}`,
        });
      });
  }

  render() {
    const {
      handleSubmit,
      handleChange,
      handleSelectChange,
    } = this;

    const {
      userRegData,
      tagData,
      isValidForm,
    } = this.state;

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
              padding: '10px',
              textAlign: 'center',
              }}
            >
              LiFiD에 오신 것을 환영합니다.
            </div>
            <form onSubmit={handleSubmit}>
              <div className={cx('container')}>
                <label htmlFor="username">
                  Username
                  <br />
                  <input
                    className={cx('text-input')}
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    placeholder="이메일을 입력해주세요"
                    required
                  />
                  {
                    this.state.isValidForm.id ?
                      <FormCheck cn="alright-text" message="가입 가능한 이메일입니다" />
                    :
                      <FormCheck
                        cn="support-text"
                        message={((isExists) => {
                          if (isExists) {
                            return '이미 가입된 이메일입니다.';
                          }
                          return '올바른 Email을 입력해주세요';
                        })(isValidForm.isExists)}
                      />
                  }
                </label>
              </div>
              <div className={cx('container')}>
                <label htmlFor="password">
                  Password
                  <br />
                  <input
                    className={cx('text-input')}
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="비밀번호를 입력해주세요"
                    required
                  />
                  {
                    this.state.isValidForm.pw ?
                      <FormCheck cn="alright-text" message="올바른 비밀번호입니다" />
                    :
                      <FormCheck cn="support-text" message="비밀번호는 8~16자의 영문, 숫자, 특수문자의 조합입니다" />
                  }
                </label>
              </div>
              <div className={cx('container')}>
                <label htmlFor="tags">
                  Tags
                  <br />
                  <Select
                    className={cx('tags')}
                    value={userRegData.tags}
                    onChange={handleSelectChange}
                    multi
                    options={tagData}
                  />
                  <span className={cx('support-text')}>
                  설정한 tag에 따라서 메인 페이지에 선호한 컨텐츠가 표시됩니다.<br />
                  이는 나중에 변경할 수 있습니다.
                  </span>
                </label>
              </div>
              <div className={cx('container')}>
                <label htmlFor="description">
                  Description
                  <br />
                  <input
                    className={cx('text-input')}
                    type="text"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    placeholder="간략한 자기소개를 입력해주세요"
                  />
                </label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '15px' }}>
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
