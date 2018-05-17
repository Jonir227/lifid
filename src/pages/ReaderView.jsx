import React, { Fragment } from 'react';
import axios from 'axios';
import { Reader, LeftBar } from 'components';

class ReaderView extends React.Component {
  state = {
    novella: {},
    load: true,
  };
  componentDidMount() {
    const { docNo } = this.props.match.params;
    axios.get(`/api/novella/reader/${docNo}`)
      .then((res) => {
        this.setState({ novella: res.data.novella, load: false });
      });
  }

  shouldComponentUpdate(prevState) {
    if (prevState.novella !== this.state.novella || prevState !== this.state.load) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <Fragment>
        {
          !this.state.load &&
          <Reader novella={this.state.novella} />
        }
      </Fragment>
    );
  }
}

export default ReaderView;
