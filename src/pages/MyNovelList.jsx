import React, { Component, Fragment } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Spinner, Button } from '@blueprintjs/core';
import { MyNovelItem } from 'components';
import lazyLoad from 'util/LazyLoad';

class MyNovelList extends Component {
  state = {
    currentMode: 'drafts',
    myNovelList: {},
    loading: true,
    offset: 0,
    limit: 25,
    lazyLoad: false,
  }

  componentDidMount() {
    this.load();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.itemLoader);
  }

  onModeChange = mode => async () => {
    await this.setState({ currentMode: mode, offset: 0 });
    this.load();
  }

  load = () => {
    this.setState({ loading: true });
    const pubStatus = this.state.currentMode === 'drafts' ? 'false' : 'true';
    axios.get(`/api/novella/editor?published=${pubStatus}`)
      .then((res) => {
        this.setState({
          loading: false,
          myNovelList: res.data.novellas.map((item) => {
            const tmp = document.createElement('div');
            tmp.innerHTML = item.content;
            return {
              docNo: item.doc_number,
              title: item.title,
              content: tmp.textContent.substr(0, 300).concat('...'),
              savedDate: item.published_date,
              isPublished: tmp.isPublished,
            };
          }),
          offset: res.data.novellas.length,
        });
        window.addEventListener('scroll', this.itemLoader);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  itemLoader = lazyLoad(() => {
    if (!this.state.lazyLoad && !this.state.loading) {
      const pubStatus = this.state.currentMode === 'drafts' ? 'false' : 'true';
      const load = axios.get(`/api/novella/editor?offset=${this.state.offset}&limit=${this.state.limit}&published=${pubStatus}`)
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

  deleteFunc = (docNo) => {
    this.setState(prevState => ({
      myNovelList: _.reject(prevState.myNovelList, ['docNo', docNo]),
    }));
  }

  render() {
    return (
      <Fragment>
        <div style={{
          backgroundImage: 'url("./mynovella_banner.jpg")',
          backgroundSize: '100%',
          marginBottom: 3,
          background: {
            color: 'rgba(0, 0, 0, 0.5)',
            blendMode: 'darken',
          },
          }}
        >
          <div style={{
            fontSize: '2.5rem',
            paddingTop: '2rem',
            paddingBottom: '0.5rem',
            paddingLeft: '1rem',
            color: 'white',
            }}
          >
            내 글 보기
          </div>
          <div style={{
            fontSize: '2rem',
            paddingBottom: '1rem',
            paddingLeft: '2rem',
            color: '#CCCCCC',
            }}
          >
            {this.state.currentMode === 'drafts' ? 'Draft' : 'Published'}
          </div>
        </div>
        <div style={{ height: 3, backgroundColor: '#CFCFCF' }} />
        <div style={{ height: 40, display: 'flex', alignItems: 'center' }}>
          <div>
            <Button className="pt-minimal" text="Draft" onClick={this.onModeChange('drafts')} />
          </div>
          <div>
            <Button className="pt-minimal" text="Published" onClick={this.onModeChange('published')} />
          </div>
        </div>
        <div style={{ height: 3, backgroundColor: '#CFCFCF' }} />
        {
          !this.state.loading ? this.state.myNovelList.map(item => (
            <MyNovelItem key={item.docNo} novelData={item} deleteFunc={this.deleteFunc} />
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
      </Fragment>
    );
  }
}

export default MyNovelList;
