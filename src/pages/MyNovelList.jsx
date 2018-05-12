import React, { Component, Fragment } from 'react';
import { MyNovelItem } from 'components';
import axios from 'axios';
import _ from 'lodash';

class MyNovelList extends Component {
  constructor(props) {
    super(props);
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
              content: tmp.textContent,
            };
          }),
        });
      });
  }

  state = {
    myNovelList: {},
    loading: true,
  }

  deleteFunc = (docNo) => {
    this.setState(prevState => ({
      myNovelList: _.reject(prevState.myNovelList, ['docNo', docNo]),
    }));
  }

  render() {
    return (
      <Fragment>
        {
          !this.state.loading && this.state.myNovelList.map(item => (
            <MyNovelItem novelData={item} deleteFunc={this.deleteFunc} />
          ))
        }
      </Fragment>
    );
  }
}

export default MyNovelList;
