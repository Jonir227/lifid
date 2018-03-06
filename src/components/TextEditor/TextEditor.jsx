import React from 'react';
import { Card } from '@blueprintjs/core';
import ClassNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { LeftBar } from 'components';
import styles from './TextEditor.scss';

const cx = ClassNames.bind(styles);

const TextEditor = ({ onChange }) => {
  return (
    <div className={cx('editor')}>
      <Card className={cx('card-wrapper')}>
        <LeftBar />
        <div className={cx('text-write-area')} onChange={onChange} contentEditable> this content can be edited </div>
      </Card>
    </div>
  );
};

TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default TextEditor;
