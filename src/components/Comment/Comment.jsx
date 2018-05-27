import React from 'react';
import PropTypes from 'prop-types';
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
      delComment,
      comments,
      isLoggedIn,
      userData,
    } = this.props;
    return (
      <div className={cx('comment-wrapper')}>
        <div className={cx('comment-header')}>
          <span>댓글</span>
          <span className={cx('count')}> ({comments.length}개)</span>
        </div>
        <div className={cx('comment-area')}>
          <TextArea className={cx('comment-input')} value={this.state.comment} onChange={this.onChange} placeholder="댓글을 입력해 주세요." />
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
                    <div>
                      {moment(item.time).fromNow()}
                    </div>
                    {
                      isLoggedIn
                        && (userData.username === item.name)
                        && <Button style={{ height: 10 }} className="pt-minimal" icon="cross" onClick={delComment(item)} />
                    }
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

Comment.propType = {
  regComment: PropTypes.func.isRequired,
  delComment: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    itime: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
