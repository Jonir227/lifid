import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Card } from '@blueprintjs/core';
import _ from 'lodash';
import styles from './LeftBar.scss';

const cx = ClassNames.bind(styles);

const LeftBar = ({ sections, indexFunction }) => {
  return (
    <Card className={cx('left-bar')}>
      <strong>Table Of Content</strong>
      <div className={cx('sections')}>
        {
          _.map(sections, (section) => {
            if (section.length >= 3) {
              console.log(section);
              return <div className={cx('section-item')}>{section.substring(2)}</div>;
            }
          })
        }
      </div>
    </Card>
  );
};

LeftBar.propTypes = {
  sections: PropTypes.objectOf(PropTypes.string).isRequired,
  indexFunction: PropTypes.func.isRequired,
};

export default LeftBar;
