import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Intent } from '@blueprintjs/core';
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
      .catch((err) => { console.error(err) });
  };
  return (
    <Card>
      <div className={cx('title')}> 제목: {novelData.title}</div>
      <div className={cx('content')}> 본문: {novelData.content}</div>
      <Link to={`/my-novellas/editor/${novelData.docNo}`}><Button className="pt-minimal" icon="draw" /></Link>
      <Button icon="cross" className="pt-minimal" onClick={del} />
    </Card>
  );
};

export default MyNovelItem;
