import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card } from '@blueprintjs/core';
import ClassNames from 'classnames/bind';
import styles from './NovellaListItem.scss';

const cx = ClassNames.bind(styles);

class NovellaListItem extends Component {
  componentDidMount() {
  }

  render() {
    const {
      novellaName,
      novellaContent,
      author,
      authorInfo,
      className,
    } = this.props;

    return (
      <div className={className}>
        <Card className={cx('card')} interactive>
          <div className={cx('name')}>{ novellaName }</div>
          <div className={cx('content')}>{ novellaContent }</div>
          <div className={cx('bottom-bar')}>
            <img className={cx('profile')} src={`api/user/profile-pic/${author}`} alt="profile" />
            <div className={cx('user-info')}>
              <div>{ author }</div>
              <div style={{ color: '#C1C1C1' }}>{ authorInfo }</div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

NovellaListItem.propTypes = {
  novellaName: PropTypes.string.isRequired,
  novellaContent: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorInfo: PropTypes.string.isRequired,
};

export default NovellaListItem;
