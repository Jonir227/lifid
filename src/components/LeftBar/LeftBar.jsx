import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Card } from '@blueprintjs/core';
import _ from 'lodash';
import styles from './LeftBar.scss';

const cx = ClassNames.bind(styles);

const LeftBar = ({ sections, className }) => (
  <div className={className}>
    <Card className={cx('left-bar')}>
      <div className={cx('head')}>Table Of Content</div>
      <div>
        {
          _.map(sections, (section, index) => (
            <a key={index} className={cx('sections')} href={`#sec${index}`}>
              {section.substring(2)}
            </a>
          ))
        }
      </div>
    </Card>
  </div>
);

LeftBar.propTypes = {
  sections: PropTypes.arrayOf(String).isRequired,
};

export default LeftBar;
