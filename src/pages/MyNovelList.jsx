import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class MyNovelList extends Component {
  constructor(props) {
    super(props);
    axios.get('/api/novella/editor')
      .then((res) => {
        this.setState({
          loading: false,
          myNovelList: res.data.novellas,
        });
      });
  }

  state = {
    myNovelList: {},
    loading: true,
  }

  render() {
    return (
      <Fragment>
        {
          !this.state.loading && this.state.myNovelList.map(item => (
            <div>{item.content}</div>
          ))
        }
      </Fragment>
    );
  }
}

MyNovelList.propTypes = {

};

export default MyNovelList;
