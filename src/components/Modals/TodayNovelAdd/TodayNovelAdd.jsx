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
    dueDate: '',
    time: {},
  }
  componentDidMount = () => {
    const date = moment(this.state.time).format('YYYY-MM-DD').toString();
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    let day;
    console.log('month : ', month);
    if (month === '01' || month === '03' || month === '05' || month === '07' || month === '08'
      || month === '10' || month === '12') {
      day = '31';
    } else if (month === '04' || month === '06' || month === '09' || month === '11') {
      day = '30';
    } else if ((month === '02' && year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      day = '29';
    } else {
      day = '28';
    }
    this.setState({
      dueDate: `${year}-${month}-${day}`.toString(),
    });
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
  novelNameChange = () => {
    const addData = {
      dueDate: this.state.dueDate,
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
                <Button className="button" onClick={this.novelNameChange} text={<div style={{ fontSize: '1.6rem' }}>Add</div>} />
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
