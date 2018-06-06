import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import styles from './QuoteCard.scss';

const cx = ClassNames.bind(styles);

const QuoteCard = ({ name, author, quotation }) => (
  <div className={cx('card')}>
    <div className={cx('quotation')}>{quotation}</div>
    <div className={cx('author')}>{author}, {name}</div>
  </div>
);

QuoteCard.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  quotation: PropTypes.string.isRequired,
};

export default QuoteCard;