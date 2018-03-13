import React, { Component } from 'react';
import axios from 'axios';

class Reader extends Component {
  state = {
    textData: '',
  }

  componentDidMount() {
    this.fetchNovel(1);
  }

  fetchNovel = (novelId) => {
    axios.get('/api/novella', {
      params: {
        id: novelId,
      },
    }).then((res) => { console.log(res); })
      .catch((err) => { console.log(err); });
  }

  render() {
    return <div></div>;
  }
}

export default Reader;
