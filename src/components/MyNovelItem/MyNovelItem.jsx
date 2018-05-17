import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Intent } from '@blueprintjs/core';
import ClassNames from 'classnames/bind';
import { AppToaster } from 'components';
import styles from './MyNovelItem.scss';

const cx = ClassNames.bind(styles);

const MyNovelItem = ({ novelData, deleteFunc }) => {
  const del = () => {
    axios.delete(`/api/novella/editor/${novelData.docNo}`)
      .then(() => {
        AppToaster.show({
          message: '글이 삭제되었습니다',
          intent: Intent.PRIMARY,
        });
        deleteFunc(novelData.docNo);
      })
      .catch((err) => { console.error(err); });
  };
  return (
    <div className={cx('card')}>
      <div className={cx('top')}>
        <div className={cx('title')}>{novelData.title === '' ? '제목이 없습니다' : novelData.title}</div>
        <div>
          <Link to={`/my-novellas/editor/${novelData.docNo}`}><Button className="pt-minimal" icon="draw" /></Link>
          <Button icon="cross" className="pt-minimal" onClick={del} />
        </div>
      </div>
      <div className={cx('content')}>{novelData.content === '' ? '본문이 없습니다' : novelData.content}</div>
      <div className={cx('last-saved')}>{novelData.savedDate}</div>
    </div>
  );
};

export default MyNovelItem;
