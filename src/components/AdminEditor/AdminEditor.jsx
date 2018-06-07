import React, { Fragment } from 'react';
import ClassNames from 'classnames/bind';
import axios from 'axios';
import { Card, Button, Spinner, Intent, ProgressBar } from '@blueprintjs/core';
import { Modals, AppToaster } from 'components';
import _ from 'lodash';
import moment from 'moment';
import lazyLoad from 'util/LazyLoad';
import styles from './AdminEditor.scss';

const cx = ClassNames.bind(styles);
class AdminEditor extends React.Component {
  state = {
    todayNovelData: {},
    modalState: 'Exit',
    loading: true,
    offset: 0,
    limit: 10,
    lazyLoad: false,
  }
  componentDidMount() {
    this.load();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.itemLoader);
  }
  todayDate = () => {
    const date = moment().format('YYYY-MM-DD').toString();
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    let day;
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
    return `${year}-${month}-${day}`.toString();
  }
  nowDayofDate = () => {
    const date = moment(this.state.time).format('YYYY-MM-DD').toString();
    const day = date.split('-');
    return day;
  }
  load = () => {
    axios.get('api/today-novel/?offset=0&limit=20')
      .then((res) => {
        this.setState(() => ({
          loading: false,
          todayNovelData: res.data.todayNovels,
          offset: res.data.todayNovels.length,
        }));
        window.addEventListener('scroll', this.itemLoader);
      })
      .catch((res) => {
        console.error(res);
      });
  }
  itemLoader = lazyLoad(() => {
    if (!this.state.lazyLoad && !this.state.loading) {
      const load = axios.get(`/api/today-novel/?offset=${this.state.offset}&limit=${this.state.limit}`)
        .then((res) => {
          const fetchedVal = res.data.todayNovels.length;
          if (fetchedVal === 0) {
            this.setState({ isEnd: true, lazyLoad: false });
            return;
          }
          this.setState(prevState => ({
            todayNovelData: (() => {
              const fetchedData = res.data.todayNovels;
              return _.concat(prevState.todayNovelData, fetchedData);
            })(),
            offset: (prevState.offset + fetchedVal),
            lazyLoad: false,
          }));
        });
      this.setState(() => ({
        lazyLoad: true,
      }), load.resolve);
    }
  });
  modalModify = (modalAction) => {
    this.setState({
      modalState: modalAction,
    });
  }
  deleteFunc = (_id) => {
    this.setState(prevState => ({
      todayNovelData: _.reject(prevState.todayNovelData, ['_id', _id]),
    }));
  }
  del = (_id) => {
    console.log(_id);
    axios.delete(`/api/today-novel/${_id}`)
      .then(() => {
        AppToaster.show({
          message: '삭제되었습니다',
          intent: Intent.PRIMARY,
        });
        this.deleteFunc(_id);
      })
      .catch((err) => { console.error(err); });
  };
  render() {
    const lastday = this.todayDate().split('-')[2];
    const nowday = this.nowDayofDate()[2];
    const nowmonth = this.nowDayofDate()[1];
    const nowyear = this.nowDayofDate()[0];
    return (
      <Fragment>
        <Card className={cx('admin-card')}>
          <div className={cx('text-wrapper')}>
            <div style={{ margin: 'auto', fontSize: '2rem' }}>Add Today&apos;s Novel</div>
            <br />
            {
              !this.state.loading
              && ((nowmonth > this.state.todayNovelData[0].dueDate.split('-')[1])
              || (nowyear > this.state.todayNovelData[0].dueDate.split('-')[0])
              || (nowmonth === this.state.todayNovelData[0].dueDate.split('-')[1] && nowday >= (lastday - 7))) ?
                <div className={cx('update-button')}>
                  <Button className="pt-minimal" onClick={() => { this.modalModify('Add'); }} text={<div style={{ fontSize: '1.2rem' }}>추가하기</div>} />
                </div>
              :
                <div className={cx('progress-bar')}>
                  <div>
                    <div>남은 기간 : {lastday - nowday} 일</div>
                    <hr style={{ color: 'black', height: 3 }} />
                    <ProgressBar className="pt-no-stripes pt-no-animation" value={(nowday / lastday)} />
                  </div>
                  <div>
                    <div style={{ color: 'grey' }}>아직 추가기간이 아닙니다.</div>
                  </div>
                </div>
            }
          </div>
        </Card>
        {
          !this.state.loading ? this.state.todayNovelData.map(data => (
            <div key={data._id} className={cx('card-list')}>
              <div className={cx('title')}>
                <div style={{ fontSize: '1.6rem' }}>{data.name}</div>
                <div>
                  <Button icon="cross" className="pt-minimal" onClick={() => this.del(data._id)} />
                </div>
              </div>
              <br />
              <div style={{ fontSize: '1rem' }}>문구: {data.quotation}</div>
              <div style={{ fontSize: '1rem' }}>작가: {data.author}</div>
              <div style={{ fontSize: '1rem' }}>날짜: {data.dueDate}</div>
            </div>
          ))
          :
          <div style={{
            display: 'flex',
            fontSize: '1.5rem',
            paddingTop: '10rem',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            }}
          >
            <Spinner />
            <div style={{ textAlign: 'center' }}>로딩중입니다.</div>
          </div>
        }
        {
          this.state.lazyLoad && <div style={{ padding: 15, display: 'flex', justifyContent: 'center' }}> <Spinner /> </div>
        }
        {
          !this.state.loading && !this.state.lazyLoad && this.state.isEnd &&
          <div style={{
            padding: 15,
            display: 'flex',
            justifyContent: 'center',
            fontSize: '1.2rem',
            color: '#CCCCCC',
            }}
          >
            문서의 끝입니다
          </div>
        }
        {
          (this.state.modalState !== 'Exit') &&
            <Modals
              modalState={this.state.modalState}
              modalModify={this.modalModify}
              calLastDayOfMonth={this.todayDate}
            />
        }
      </Fragment>
    );
  }
}

export default AdminEditor;

