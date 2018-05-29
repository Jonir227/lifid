import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import queryString from 'query-string';

class SearchView extends Component {
  state = {
    searchData: [],
  }
  componentDidMount() {
    const queryData = queryString.parse(this.props.location.search);
    this.setState(() => ({
      type: queryData.type,
      value: queryData.value,
      todayNovel: queryData.todayNovel,
    }));
    this.getSerchValue(this.state.type, this.state.value, this.state.todayNovel);
  }

  getSerchValue = (type, value, todayNovel) => {
    axios.get(`/api/novella/search?type=${type}&value=${value}&todayNovel=${todayNovel}`)
      .then((res) => {
        this.setState({
          searchData: res.data.result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const {
      type,
      value,
      todayNovel,
      searchData,
    } = this.state;

    return (
      <Fragment>
        <div>{type} : {value}</div>
        {
          this.state.searchData.map(item => (
            <div key={item.doc_number}>
              {item.title}
              {item.author}
            </div>
          ))
        }
      </Fragment>
    );
  }
}

SearchView.propTypes = {

};

export default SearchView;
