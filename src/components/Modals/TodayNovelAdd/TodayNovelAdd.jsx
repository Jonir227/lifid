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
    imagePath: '',
    imageDataUri: '',
    imageLoad: false,
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
  onChangeImagePath = (input) => {
    this.setState({
      imagePath: input.target.value,
    });
    this.getDataUri();
  }
  getDataUri = () => {
    const filename = document.getElementById('file_id');
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fReader = new FileReader();
    fReader.readAsDataURL(filename.files[0]);
    fReader.onload = () => {
      const data = fReader.result;
      img.src = data;
      img.onload = () => {
        canvas.width = 800;
        canvas.height = 300;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        this.setState({
          imageLoad: true,
          imageDataUri: canvas.toDataURL('image/png'),
        });
      };
      console.log(this.state.imageDataUri);
    };
  }
  calDueDate = () => {
    let date = this.props.calLastDayOfMonth();
    moment(date).add(1, 'months').format('YYYY-MM-DD');
    date = moment(date).add(1, 'months').format('YYYY-MM-DD');
    const event = moment(date).endOf('month');
    const lastday = event._d.toString().split(' ')[2];
    date = date.split('-');
    date[2] = lastday;
    date = date.join('-');
    return date;
  }
  addTodayNovel = () => {
    const addData = {
      dueDate: this.calDueDate(),
      author: this.state.author,
      name: this.state.name,
      quotation: this.state.quotation,
      image: this.state.imageDataUri,
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
    window.location.reload();
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
              <div>
                <div className={cx('side-text')}>Input your image path </div>
                <input className={cx('text-input')} type="file" id="file_id" value={this.state.imagePath} onChange={this.onChangeImagePath} />
              </div>
              {
                this.state.imageLoad &&
                <div style={{ alignConten: 'center' }}>
                  <img width="160" height="60" src={this.state.imageDataUri} alt="preview" />
                </div>
              }
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
