import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import queryString from 'query-string';
import { SearchResultItem, QuoteCard } from 'components';

class SearchView extends Component {
  state = {
    searchData: [],
    type: '',
    value: '',
    todayNovel: '',
  }
  componentDidMount() {
    const queryData = queryString.parse(this.props.location.search);
    this.setState(() => ({
      type: queryData.type,
      value: queryData.value,
      todayNovel: queryData.todayNovel,
    }));
    this.getSerchValue(queryData.type, queryData.value, queryData.todayNovel);
  }

  getSerchValue = (type, value, todayNovel) => {
    axios.get(`/api/novella/search?type=${type}&value=${value}&todayNovel=${todayNovel}`)
      .then((res) => {
        this.setState({
          searchData: res.data.novellas,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  prevQuote = {};

  render() {
    const {
      type,
      value,
      todayNovel,
      searchData,
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
            {type} : {value}
          </div>
        </div>
        {
          this.state.searchData.map((item) => {
            const renderData = [];
            if (this.prevQuote.quotation !== item.todayNovel.quotation) {
              this.prevQuote = item.todayNovel;
              renderData.push(<QuoteCard
                name={item.todayNovel.name}
                author={item.todayNovel.author}
                quotation={item.todayNovel.quotation}
              />);
            }
            renderData.push(<SearchResultItem
              key={item.doc_number}
              title={item.title}
              content={item.content}
              author={item.author}
              views={item.views}
              docNo={item.doc_number}
            />);
            return renderData;
          })
        }
      </Fragment>
    );
  }
}

SearchView.propTypes = {

};

export default SearchView;
