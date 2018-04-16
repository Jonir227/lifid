import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Card } from '@blueprintjs/core';
import _ from 'lodash';
import styles from './LeftBar.scss';

const cx = ClassNames.bind(styles);

const LeftBar = ({ sections }) => (
  <Card className={cx('left-bar')}>
    <div className={cx('head')}>Table Of Content</div>
    <div className={cx('sections')}>
      {
        _.map(sections, (section, index) => (
          <div>
            <a href={`#sec${index}`}>
              {section.substring(2)}
            </a>
          </div>
        ))
      }
    </div>
  </Card>
);

LeftBar.propTypes = {
  sections: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default LeftBar;
