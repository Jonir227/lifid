import React, { Component } from 'react';
import axios from 'axios';

class Reader extends Component {
  state = {
    textData: '',
  }

  componentDidMount() {
    this.fetchNovel();
  }

  fetchNovel = () => {
    axios.get('/api/novella')
      .then((res) => {
        console.log(res.data);
        this.setState({ textData: res.data[0].content }); 
      })
      .catch((err) => { console.log(err); });
  }

  render() {
    return <div>{this.state.textData}</div>;
  }
}

export default Reader;
