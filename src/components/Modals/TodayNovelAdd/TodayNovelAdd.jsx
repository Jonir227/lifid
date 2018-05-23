import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Button, Intent } from '@blueprintjs/core';
import { AppToaster } from 'components';
import axios from 'axios';
import moment from 'moment';
import styles from './TodayNovelAdd.scss';

const cx = ClassNames.bind(styles);


class TodayNovelAdd extends Component {
  state = {
    name: '',
    quotation: '',
    author: '',
    time: {},
  }

  onChangeName = (input) => {
    this.setState({
      name: input.target.value,
    });
  }
  onChangeQuotation = (input) => {
    this.setState({
      quotation: input.target.value,
    });
  }
  onChangeAuthor = (input) => {
    this.setState({
      author: input.target.value,
    });
  }

  addTodayNovel = () => {
    const addData = {
      dueDate: this.props.calLastDayOfMonth(),
      author: this.state.author,
      name: this.state.name,
      quotation: this.state.quotation,
    };
    console.log(addData);
    axios.post('/api/today-novel/', addData)
      .then((res) => {
        console.log(res.data);
        AppToaster.show({
          message: '추가되었습니다.',
          intent: Intent.SUCCESS,
        });
      })
      .catch((res) => {
        console.error(res);
      });
    this.props.modalModify('Exit');
  }
  render() {
    const {
      modalModify,
    } = this.props;
    return (
      <div className={cx('modal-background')}>
        <div className={cx('modal-body')}>
          <div className={cx('text-wrapper')}>
            <div className={cx('exit-wrapper')}>
              <Button className="pt-minimal" icon="cross" onClick={() => { modalModify('Exit'); }} />
            </div>
            <div className={cx('modal-contents')}>
              <div>
                <div className={cx('title-text')}>Add Today Novel</div>
              </div>
              <div>
                <div className={cx('side-text')}>소설 제목 </div>
                <input className={cx('text-input')} value={this.state.name} onChange={this.onChangeName} />
              </div>
              <div>
                <div className={cx('side-text')}>오늘 문장 </div>
                <input className={cx('text-input')} value={this.state.quotation} onChange={this.onChangeQuotation} />
              </div>
              <div>
                <div className={cx('side-text')}>소설 작가 </div>
                <input className={cx('text-input')} value={this.state.author} onChange={this.onChangeAuthor} />
              </div>
              <div className={cx('update-button')}>
                <Button className="button" onClick={this.addTodayNovel} text={<div style={{ fontSize: '1.6rem' }}>Add</div>} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
TodayNovelAdd.propTypes = {
  modalModify: PropTypes.func.isRequired,
};

export default TodayNovelAdd;
