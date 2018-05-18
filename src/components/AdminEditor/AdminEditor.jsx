import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import axios from 'axios';
import { Card, Button, Spinner } from '@blueprintjs/core';
import { Modals } from 'components';
import _ from 'lodash';
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
  load = () => {
    axios.get('api/today-novel/list?offset=0&limit=20')
      .then((res) => {
        this.setState({
          loading: false,
          todayNovelData: res.data.todayNovels,
          offset: res.data.todayNovels.length,
        });
        window.addEventListener('scroll', this.itemLoader);
      })
      .catch((res) => {
        console.error(res);
      });
  }
  itemLoader = lazyLoad(() => {
    if (!this.state.lazyLoad && !this.state.loading) {
      const load = axios.get(`/api/today-novel/list?offset=${this.state.offset}&limit=${this.state.limit}`)
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
  render() {
    return (
      <Fragment>
        <Card className={cx('admin-card')}>
          <div className={cx('text-wrapper')}>
            <h1 style={{ margin: 'auto' }}>Add Today's Novel</h1>
            <br />
            {
              //times === '00 00 00 00' &&
              <div className={cx('update-button')}>
                <Button className="pt-minimal" onClick={() => { this.modalModify('Add'); }} text={<div style={{ fontSize: '1.6rem' }}>추 가</div>} />
              </div>
            }
          </div>
        </Card>
        {
          !this.state.loading ? this.state.todayNovelData.map(data => (
            <div>
              <Card className={cx('card-list')}>
                <div className={cx('old-todaynovel')}>
                  <div style={{ fontSize: '1.6rem' }}>{data.name}</div>
                  <div>문구: {data.quotation}</div>
                  <div>작가: {data.author}</div>
                  <div>날짜: {data.dueDate}</div>
                </div>
              </Card>
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
            />
        }

      </Fragment>
    );
  }
}
AdminEditor.propTypes = {
  novelData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    quotation: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminEditor;

