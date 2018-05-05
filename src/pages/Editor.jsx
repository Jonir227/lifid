import React from 'react';
import PropType from 'prop-types';
import axios from 'axios';
import { TextEditor } from 'components';

class Editor extends React.Component {
  state = {
    loadPending: true,
    docNo: this.props.docNumber,
  }

  shouldComponentUpdate(prevState, nextProps) {
    if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.state.docNo === 0 && this.props.isLoggedIn) {
      axios.post('/api/novella/editor', { published_date: Date.now() })
        .then((res) => {
          this.setState(() => ({ docNo: res.data.docNo }));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  render() {
    const {
      userData,
      novelData,
    } = this.props;

    return (
      <TextEditor novelData={novelData} userData={userData} docNumber={this.state.docNo} />
    );
  }
}

Editor.defaultProps = {
  docNumber: 0,
};

export default Editor;
