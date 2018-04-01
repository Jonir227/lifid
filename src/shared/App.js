import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FocusStyleManager } from '@blueprintjs/core';
import { ContentBody, Editor, ReaderView } from 'pages';
import { TopNavbar, BtmFooter } from 'components';
import styles from 'styles/base.scss';

const cx = classNames.bind(styles);

class App extends Component {
  render() {
    // Blueprintjs의 특징은 Focus가 갔을때 파란 테두리가 쳐지는 점인데,
    // 이거 보기 싫어서 나오지 않는 옵션을 넣엇음.
    FocusStyleManager.onlyShowFocusOnTabs();

    return (
      <Fragment>
        <TopNavbar modalModify={this.modalModify} />
        <div className={cx('content-body')}>
          <Route exact path="/" component={ContentBody} />
          <Route exact path="/editor" component={Editor} />
          <Route exact path="/reader" component={ReaderView} />
        </div>
        <BtmFooter />
      </Fragment>
    );
  }
}

export default App;
