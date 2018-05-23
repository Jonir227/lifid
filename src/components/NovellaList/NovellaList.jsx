import React, {  Fragment } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import Slider from 'react-slick';
import styles from './NovellaList.scss';
import NovellaListItem from './NovellaListItem';
import './slick-theme.css';
import './slick.css';


const cx = ClassNames.bind(styles);

const NovellaList = ({ novelData, userData, isLoggedIn }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Fragment>
      {
        isLoggedIn ?
        userData.tags.map(usertag => (
          <div>
            <br />
            <div className={cx('list-header')}> #{usertag}</div>
            <Slider {...settings} style={{ width: '100%' }}>
              {
                novelData.map(novel => (
                  <div className={cx('novellalist-wrapper')}>
                    <NovellaListItem
                      className={cx('novella-item')}
                      novellaName={novel.name}
                      novellaContent={novel.content}
                      author={novel.author}
                      authorInfo={novel.authorInfo}
                    />
                  </div>
                ))
              }
            </Slider>
          </div>
        ))
        :
        <Slider {...settings} style={{ width: '100%' }}>
          {
            novelData.map(novel => (
              <div className={cx('novellalist-wrapper')}>
                <NovellaListItem
                  className={cx('novella-item')}
                  novellaName={novel.name}
                  novellaContent={novel.content}
                  author={novel.author}
                  authorInfo={novel.authorInfo}
                />
              </div>
            ))
          }
        </Slider>
      }
    </Fragment>
  );
};

NovellaList.propTypes = {
  novelData: PropTypes.arrayOf(Object).isRequired,
};

export default NovellaList;
