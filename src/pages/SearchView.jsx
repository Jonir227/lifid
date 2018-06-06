import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import queryString from 'query-string';
import _ from 'lodash';
import { SearchResultItem, QuoteCard } from 'components';
import lazyLoad from 'util/LazyLoad';
import { Spinner } from '@blueprintjs/core';

class SearchView extends Component {
  state = {
    loading: true,
    lazyLoad: false,
    isEnd: false,
    offset: 0,
    limit: 10,
    searchData: [],
    type: '',
    value: '',
    today_novel: '',
  }


  componentDidMount() {
    const queryData = queryString.parse(this.props.location.search);
    this.setState(() => ({
      type: queryData.type,
      value: queryData.value,
      todayNovel: queryData.today_novel,
    }));
    window.addEventListener('scroll', this.itemLoader);
    this.getSerchValue(queryData.type, queryData.value, queryData.today_novel);
  }

  componentWillReceiveProps(nextProps, prevState) {
    const queryData = queryString.parse(nextProps.location.search);
    if (queryData.type !== prevState.type ||
      queryData.value !== prevState.value ||
      queryData.today_novel !== prevState.today_novel) {
      this.setState({
        type: queryData.type,
        value: queryData.value,
        today_novel: queryData.today_novel,
      });
      this.getSerchValue(queryData.type, queryData.value, queryData.today_novel);
    }
    return null;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.itemLoader);
  }

  getSerchValue = (type, value, todayNovel) => {
    const novelQuery = typeof todayNovel === 'undefined' ? '' : `&today_novel=${todayNovel}`;
    this.prevQuote = {};
    axios.get(`/api/novella/search?type=${type}&value=${value}${novelQuery}`)
      .then((res) => {
        this.setState({
          loading: false,
          searchData: res.data.novellas,
          offset: res.data.novellas.length,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  prevQuote = {};

  itemLoader = lazyLoad(() => {
    if (!this.state.lazyLoad && !this.state.loading && !this.state.isEnd) {
      const novelQuery = typeof this.state.today_novel === 'undefined' ? '' : `&today_novel=${this.state.today_novel}`;
      axios.get(`/api/novella/search?type=${this.state.type}&value=${this.state.value}&offset=${this.state.offset}&limit${this.state.limit}${novelQuery}`)
        .then((res) => {
          const fetchedVal = res.data.novellas.length;
          if (fetchedVal === 0) {
            this.setState({ isEnd: true, lazyLoad: false });
            return;
          }
          this.setState(prevState => ({
            searchData: _.concat(prevState.searchData, res.data.novellas),
            offset: (prevState.offset + fetchedVal),
            lazyLoad: false,
          }));
          console.log(this.state);
        });
      this.setState(() => ({
        lazyLoad: true,
      }));
    }
  });


  render() {
    const {
      type,
      value,
    } = this.state;

    return (
      <Fragment>
        <div>
          {/*
            Header Card
          */}
          <div style={{
            paddingTop: '3rem',
            paddingBottom: '2rem',
            fontSize: '2rem',
            fontWeight: '700',
          }}
          >
            Search Result
          </div>
          <div style={{
            fontSize: '1.5rem',
            paddingBottom: '1rem',
            marginBottom: '1rem',
            borderBottom: '1px solid #CCCCCC',
            }}
          >
            {
              value !== undefined ?
                <Fragment>
                  {type} : {value}
                </Fragment>
              :
                <Fragment>
                  Top Views
                </Fragment>
            }
          </div>
        </div>
        {
          this.state.loading ?
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              }}
            >
              <Spinner />
              <p>로딩 중입니다.</p>
            </div>
          :
            this.state.searchData.map((item) => {
              const renderData = [];
              let author = item.author.username;
              if (typeof author === 'undefined') {
                author = item.author;
              }
              if (this.prevQuote.quotation !== item.todayNovel.quotation) {
                this.prevQuote = item.todayNovel;
                renderData.push(<QuoteCard
                  name={item.todayNovel.name}
                  author={item.todayNovel.author}
                  quotation={item.todayNovel.quotation}
                  key={item.todayNovel.name}
                />);
              }
              renderData.push(<SearchResultItem
                key={item.doc_number}
                title={item.title}
                content={item.content}
                author={author}
                views={item.views}
                docNo={item.doc_number}
              />);
              return renderData;
            })
        }
        {
          !this.state.loading && this.state.lazyLoad &&
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            }}
          >
            <Spinner />
            <p>로딩 중입니다.</p>
          </div>
        }
        {
          !this.state.loading && this.state.isEnd &&
          <div style={{
            fontSize: '1.1rem',
            textAlign: 'center',
            color: '#BBBBBB',
          }}
          >
            문서의 끝입니다.
          </div>
        }
      </Fragment>
    );
  }
}

SearchView.propTypes = {

};

export default SearchView;
