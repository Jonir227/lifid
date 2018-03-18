import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import styles from './NovellaList.scss';
import NovellaListItem from './NovellaListItem';

const cx = ClassNames.bind(styles);

const NovellaList = ({ novelData }) => (
  <div className={cx('novellalist-wrapper')}>
    {
      novelData.map(novel => (
        <NovellaListItem
          className={cx('novella-item')}
          novellaName={novel.name}
          novellaContent={novel.content}
          author={novel.author}
        />
      ))
    }
  </div>
);

NovellaList.propTypes = {
  novelData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default NovellaList;
