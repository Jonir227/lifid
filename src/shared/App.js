import React, { Fragment, Component } from 'react';
import { Switch } from 'react-router-dom';
import classNames from 'classnames/bind'; import PropTypes from 'prop-types';
import { FocusStyleManager } from '@blueprintjs/core';
import { PropsRoute, PrivateRoute } from 'util/RouterUtil';
import { ContentBody, Editor, ReaderView, MyNovelList, AdminView, SearchView } from 'pages';
import { BtmFooter, TopNavbar } from 'components';
import styles from 'styles/base.scss';

const cx = classNames.bind(styles);

class App extends Component {
  componentDidMount() {
    this.props.checkUser();
    this.props.getTodayNovel('now');
  }

  componentWillReceiveProps(props) {
    if (props.isLoggedIn && !props.notiPending && props.notificationStatus === false) {
      this.props.fetchNotifications(
        props.isLoggedIn,
        props.userData.username,
        props.notiOffset,
        props.notiLimit,
      );
      return true;
    }
    return true;
  }

  render() {
    // Blueprintjs의 특징은 Focus가 갔을때 파란 테두리가 쳐지는 점인데,
    // 이거 보기 싫어서 나오지 않는 옵션을 넣엇음.
    FocusStyleManager.onlyShowFocusOnTabs();

    const {
      login,
      logout,
      isLoggedIn,
      userData,
      pending,
      novelPending,
      novelData,
      notiOffset,
      notiLimit,
      notiCount,
      fetchNotifications,
      readNotification,
      notificationStatus,
      notiPending,
      notifications,
      notiNext,
      notiBefore,
      notiTotal,
      readPedning,
    } = this.props;

    return (
      <Fragment>
        <TopNavbar
          login={login}
          logout={logout}
          isLoggedIn={isLoggedIn}
          userData={userData}
          novelData={novelData}
          pending={pending}
          notiOffset={notiOffset}
          notiLimit={notiLimit}
          notiCount={notiCount}
          fetchNotifications={fetchNotifications}
          readNotification={readNotification}
          notificationStatus={notificationStatus}
          notifications={notifications}
          notiPending={notiPending}
          notiTotal={notiTotal}
          notiNext={notiNext}
          notiBefore={notiBefore}
          readPedning={readPedning}
        />
        <div className={cx('content-body')}>
          <PropsRoute exact path="/" pending={pending} novelPending={novelPending} isLoggedIn={isLoggedIn} component={ContentBody} novelData={novelData} userData={userData} />
          <PrivateRoute exact path="/my-novellas" isLoggedIn={isLoggedIn} component={MyNovelList} redirectTo="/" />
          <Switch>
            <PrivateRoute path="/my-novellas/editor/:docNo" isLoggedIn={isLoggedIn} component={Editor} novelData={novelData} userData={userData} redirectTo="/" />
            <PrivateRoute path="/my-novellas/editor" component={Editor} novelData={novelData} userData={userData} isLoggedIn={isLoggedIn} redirectTo="/" />
          </Switch>
          <PropsRoute path="/reader/:docNo" isLoggedIn={isLoggedIn} userData={userData} component={ReaderView} />
          <PropsRoute exact path="/admin" component={AdminView} novelData={novelData} />
          <PropsRoute path="/search" component={SearchView} novelData={novelData} />
          {/*
              TODO:
              1. User Info Page
              2. My Page
          */}
        </div>
        <BtmFooter />
      </Fragment>
    );
  }
}

App.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
  }).isRequired,

  checkUser: PropTypes.func.isRequired,
  novelData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quotation: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
  getTodayNovel: PropTypes.func.isRequired,
};

export default App;
