import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FocusStyleManager } from '@blueprintjs/core';
import { ContentBody, Editor, ReaderView } from 'pages';
import { BtmFooter, TopNavbar } from 'components';
import styles from 'styles/base.scss';

const cx = classNames.bind(styles);

const App = ({
  login,
  logout,
  isLoggedIn,
  userData,
}) => {
  // Blueprintjs의 특징은 Focus가 갔을때 파란 테두리가 쳐지는 점인데,
  // 이거 보기 싫어서 나오지 않는 옵션을 넣엇음.
  FocusStyleManager.onlyShowFocusOnTabs();

  return (
    <Fragment>
      <TopNavbar
        login={login}
        logout={logout}
        isLoggedIn={isLoggedIn}
        userData={userData}
      />
      <div className={cx('content-body')}>
        <Route exact path="/" component={ContentBody} />
        <Route exact path="/editor" component={Editor} />
        <Route exact path="/reader" component={ReaderView} />
      </div>
      <BtmFooter />
    </Fragment>
  );
};

App.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
