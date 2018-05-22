import React from 'react';
import { TextArea, Button } from '@blueprintjs/core';
import _ from 'lodash';
import moment from 'moment';
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
    const {
      regComment,
    } = this.props;
    const comments = this.props.comments.reverse();
    return (
      <div className={cx('comment-wrapper')}>
        <div className={cx('comment-header')}>
          <span>댓글</span>
          <span className={cx('count')}> ({comments.length}개)</span>
        </div>
        <div className={cx('comment-area')}>
          <TextArea className={cx('comment-input')} value={this.state.comment} onChange={this.onChange} />
          <Button className={cx('comment-btn')} text="등록" onClick={regComment(this.state.comment)} />
        </div>
        <div>
          {
            _.map(comments, (item, index) => (
              <div className={cx('comment-item')} key={index}>
                <div className={cx('username')}>
                  <div>{item.name}</div>
                </div>
                <div className={cx('comment')}>
                  <div>{item.comment}</div>
                  <div className={cx('time')}>
                    {moment(item.time).fromNow()}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Comment;
