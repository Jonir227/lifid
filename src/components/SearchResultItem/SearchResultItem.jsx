import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchResultItem.scss';

const cx = classNames.bind(styles);

const SearchResultItem = ({ title, author, content, views, docNo })=> {
  return (
    <div className={cx('container')}>
      <div className={cx('item-head')}>
        <div className={cx('views')}>
          {views} Views
        </div>
        <Link to={`/reader/${docNo}`} className={cx('title')}>
          {title}
        </Link>
      </div>
      <div className={cx('item-body')}>
        <div className={cx('author')}>
          {author}
        </div>
        <div className={cx('content')}>
          {content}
        </div>
      </div>
      <div className={cx('divbar')} />
    </div>
  );
};

SearchResultItem.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  docNo: PropTypes.string.isRequired,
};

export default SearchResultItem;