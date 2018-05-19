import React, { Fragment } from 'react';
import axios from 'axios';
import { Reader, Comment } from 'components';

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

  render() {
    return (
      <Fragment>
        {
          !this.state.load &&
          <Fragment>
            <Reader novella={this.state.novella} />
            <Comment />
          </Fragment>
        }
      </Fragment>
    );
  }
}

export default ReaderView;
