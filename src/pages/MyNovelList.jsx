import React, { Component, Fragment } from 'react';
import { MyNovelItem } from 'components';
import axios from 'axios';
import _ from 'lodash';
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
    axios.get('/api/novella/editor?offset=0&limit=40')
      .then((res) => {
        this.setState({
          loading: false,
          myNovelList: res.data.novellas.map((item) => {
            const tmp = document.createElement('div');
            tmp.innerHTML = item.content;
            return {
              docNo: item.doc_number,
              title: item.title,
              content: tmp.textContent,
            };
          }),
          offset: 40,
        });
        lazyLoad(this.itemLoader);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteFunc = (docNo) => {
    this.setState(prevState => ({
      myNovelList: _.reject(prevState.myNovelList, ['docNo', docNo]),
    }));
  }

  itemLoader = () => {
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
  }

  render() {
    return (
      <Fragment>
        {
          !this.state.loading && this.state.myNovelList.map(item => (
            <MyNovelItem novelData={item} deleteFunc={this.deleteFunc} />
          ))
        }
        {
          this.state.lazyLoad && <div> 로딩 중입니다. </div>
        }
        {
          !this.state.lazyLoad && this.state.isEnd && <div> 문서의 끝입니다</div>
        }
      </Fragment>
    );
  }
}

export default MyNovelList;
