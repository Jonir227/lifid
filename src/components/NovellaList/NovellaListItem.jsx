import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from '@blueprintjs/core';
import ClassNames from 'classnames/bind';
import styles from './NovellaListItem.scss';

const cx = ClassNames.bind(styles);

const NovellaListItem = ({
  novellaName,
  novellaContent,
  author,
  authorInfo,
  className,
  docNo,
}) => (
  <Card className={cx('card')}>
    <Link to={`/reader/${docNo}`} className={cx('link')}>
      <div className={cx('name')}>{ novellaName }</div>
    </Link>
    <div className={cx('content')}>{ novellaContent }</div>
    <div className={cx('bottom-bar')}>
      <img className={cx('profile')} src={`api/user/profile-pic/${author}`} alt="profile" />
      <div className={cx('user-info')}>
        <div>{ author }</div>
      </div>
    </div>
  </Card>
);

NovellaListItem.propTypes = {
  novellaName: PropTypes.string.isRequired,
  novellaContent: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default NovellaListItem;
