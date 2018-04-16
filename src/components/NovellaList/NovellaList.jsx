import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import Slider from 'react-slick';
import styles from './NovellaList.scss';
import NovellaListItem from './NovellaListItem';
import './slick-theme.css';
import './slick.css';


const cx = ClassNames.bind(styles);

class NovellaList extends Component {
  state={}
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      useCss: true,
    };
    return (
      <Fragment>
        <Slider {...settings}>
          {
            this.props.novelData.map(novel => (
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
      </Fragment>
    );
  }
}

NovellaList.propTypes = {
  novelData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default NovellaList;
