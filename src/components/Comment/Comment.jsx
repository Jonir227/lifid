import React from 'react';
import { TextArea } from '@blueprintjs/core';
import ClassNames from 'classnames/bind';
import styles from './Comment.scss';

const cx = ClassNames.bind(styles);

class Comment extends React.Component {
  state = {
    comment: '',
  }

  onChange = (event) => {
    this.setState({
      comment: event.target.value,
    });
  }

  render() {
    return (
      <div className={cx('comment-wrapper')}>
        <TextArea className={cx('comment-input')} value={this.state.comment} onChange={this.onChange} />
      </div>
    );
  }
}

export default Comment;
