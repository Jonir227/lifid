import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Card } from '@blueprintjs/core';
import styles from './LeftBar.scss';

const cx = ClassNames.bind(styles);

const LeftBar = ({ sections, indexFunction }) => {
  return (
    <div className={cx('left-bar')}>
      <Card >
        <strong>Table Of Content</strong>
        <div>
        </div>
      </Card>
    </div>
  );
};

LeftBar.propTypes = {
  sections: PropTypes.objectOf(PropTypes.string).isRequired,
  indexFunction: PropTypes.func.isRequired,
};

export default LeftBar;
