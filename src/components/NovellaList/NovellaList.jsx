import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import _ from 'lodash';
import styles from './NovellaList.scss';
import NovellaListItem from './NovellaListItem';


const cx = ClassNames.bind(styles);

const NovellaList = ({ novelData, userData, isLoggedIn }) => {

  return (
    <Fragment>
      {
        isLoggedIn ?
        userData.tags.map(usertag => (
          <Fragment>
            <div className={cx('list-header')}>
              <div className={cx('list-tag')}>#{usertag}</div>
              <Link className={cx('list-link')}to={`/serch?type=tag&value=${usertag}`}>더 보기 ></Link>
            </div>
            <div className={cx('list-wrapper')}>
              {
                _.map(novelData, novel => (
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
        :
        <Fragment>
          <div className={cx('list-wrapper')}>
            {
              _.map(novelData, novel => (
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
      }
    </Fragment>
  );
};

NovellaList.propTypes = {
  novelData: PropTypes.arrayOf(Object).isRequired,
};

export default NovellaList;
