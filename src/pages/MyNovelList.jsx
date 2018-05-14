import React, { Component, Fragment } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Spinner } from '@blueprintjs/core';
import { MyNovelItem } from 'components';
import lazyLoad from 'util/LazyLoad';

class MyNovelList extends Component {
  state = {
    myNovelList: {},
    loading: true,
    offset: 0,
    limit: 25,
    lazyLoad: false,
  }

  componentDidMount() {
    axios.get('/api/novella/editor')
      .then((res) => {
        this.setState({
          loading: false,
          myNovelList: res.data.novellas.map((item) => {
            const tmp = document.createElement('div');
            tmp.innerHTML = item.content;
            return {
              docNo: item.doc_number,
              title: item.title,
              content: tmp.textContent.substr(0, 150),
              isPublished: tmp.isPublished,
            };
          }),
          offset: 40,
        });
        window.addEventListener('scroll', this.itemLoader);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.itemLoader);
  }

  deleteFunc = (docNo) => {
    this.setState(prevState => ({
      myNovelList: _.reject(prevState.myNovelList, ['docNo', docNo]),
    }));
  }

  itemLoader = lazyLoad(() => {
    if (!this.state.lazyLoad) {
      const load = axios.get(`/api/novella/editor?offset=${this.state.offset}&limit=${this.state.limit}`)
        .then((res) => {
          const fetchedVal = res.data.novellas.length;
          if (fetchedVal === 0) {
            this.setState({ isEnd: true, lazyLoad: false });
            return;
          }
          this.setState(prevState => ({
            myNovelList: (() => {
              const fetchedData = res.data.novellas.map((item) => {
                const tmp = document.createElement('div');
                tmp.innerHTML = item.content;
                return {
                  docNo: item.doc_number,
                  title: item.title,
                  content: tmp.textContent,
                };
              });
              return _.concat(prevState.myNovelList, fetchedData);
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

  render() {
    return (
      <Fragment>
        <div style={{ fontSize: '3rem', padding: '1.5rem' }}>내 글 보기</div>
        {
          !this.state.loading ? this.state.myNovelList.map(item => (
            <MyNovelItem novelData={item} deleteFunc={this.deleteFunc} />
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
            <div style={{ textAlign: 'center' }}>내 글을 불러오는 중입니다.</div>
          </div>
        }
        {
          this.state.lazyLoad && <div style={{ padding: 15, display: 'flex', justifyContent: 'center' }}> <Spinner /> </div>
        }
        {
          !this.state.lazyLoad && this.state.isEnd &&
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
      </Fragment>
    );
  }
}

export default MyNovelList;
