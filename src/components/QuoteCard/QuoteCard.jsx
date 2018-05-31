import React from 'react';
import ClassNames from 'classnames/bind';
import styles from './QuoteCard.scss';

const cx = ClassNames.bind(styles);

const QuoteCard = ({ name, author, quotation }) => {
  return (
    <div className={cx('card')}>
      <div className={cx('quotation')}>{quotation}</div>
      <div className={cx('author')}>{author}, {name}</div>
    </div>
  );
};

export default QuoteCard;