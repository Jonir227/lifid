import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import _ from 'lodash';
import styles from './NovellaList.scss';
import NovellaListItem from './NovellaListItem';


const cx = ClassNames.bind(styles);

const NovellaList = ({ novelData, isLoggedIn }) => {
  return (
    <Fragment>
      {
        _.map(novelData, (usertag, key) => (
          <Fragment>
            <div className={cx('list-header')}>
              <div className={cx('list-tag')}>#{key}</div>
              <Link className={cx('list-link')}to={isLoggedIn ? `/search?type=tag&value=${key}` : '/search'}>
                더 보기 >
              </Link>
            </div>
            <div className={cx('list-wrapper')}>
              {
                _.map(usertag, novel => (
                  <NovellaListItem
                    key={novel.doc_number}
                    className={cx('novella-item')}
                    docNo={novel.doc_number}
                    novellaName={novel.title}
                    novellaContent={novel.content}
                    author={novel.author}
                  />
                ))
              }
            </div>
          </Fragment>
        ))
      }
    </Fragment>
  );
};

NovellaList.propTypes = {
};

export default NovellaList;
