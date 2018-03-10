import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Card } from '@blueprintjs/core';
import _ from 'lodash';
import styles from './LeftBar.scss';

const cx = ClassNames.bind(styles);

const LeftBar = ({ sections }) => (
  <Card className={cx('left-bar')}>
    <strong>Table Of Content</strong>
    <div className={cx('sections')}>
      {
        _.map(sections, section =>
          (<div calssName={cx('section-item')}>{section.substring(2)}</div>))
      }
    </div>
  </Card>
);

LeftBar.propTypes = {
  sections: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default LeftBar;
