import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as loginActions from 'store/modules/loginStatus';
import * as todayNovel from 'store/modules/todayNovel';
import * as notifications from 'store/modules/notification';
import App from 'shared/App';

class AppContainer extends Component {
  handleLogin = (data) => {
    this.props.LoginStateActions.login(data);
  }

  handleLogout = () => {
    this.props.LoginStateActions.logout();
  }

  handleCheckUser = () => {
    this.props.LoginStateActions.getCheck();
  }

  handlefetchTodayNovel = (query) => {
    this.props.TodayNovelActions.getTodayNovel(query);
  }

  handlefetchNotifications = (isLoggedIn, username, offset, limit, right) => {
    this.props.NotificationActions.fetchNotifications(isLoggedIn, username, offset, limit, right);
  }

  handleReadNotifications = (notiID) => {
    this.props.NotificationActions.readNotification(notiID);
  }

  render() {
    const {
      handleLogin,
      handleLogout,
      handleCheckUser,
      handlefetchTodayNovel,
      handlefetchNotifications,
      handleReadNotifications,
    } = this;

    const {
      isLoggedIn,
      userData,
      pending,
      novelData,
      novelPending,
      notiLimit,
      notiOffset,
      notificationStatus,
      notifications,
      notiCount,
      notiPending,
      readPending,
    } = this.props;

    return (
      <App
        // login
        login={handleLogin}
        logout={handleLogout}
        isLoggedIn={isLoggedIn}
        userData={userData}
        pending={pending}
        checkUser={handleCheckUser}
        // todayNovel
        getTodayNovel={handlefetchTodayNovel}
        novelData={novelData}
        novelPending={novelPending}
        // notification
        notiOffset={notiOffset}
        notiLimit={notiLimit}
        notiCount={notiCount}
        fetchNotifications={handlefetchNotifications}
        readNotification={handleReadNotifications}
        notificationStatus={notificationStatus}
        notiPending={notiPending}
        notifications={notifications}
        readPending={readPending}
      />
    );
  }
}

AppContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
  }).isRequired,
  pending: PropTypes.bool.isRequired,
  novelData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quotation: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
  novelPending: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  // loginStatus
  isLoggedIn: state.loginStatus.isLoggedIn,
  userData: state.loginStatus.userData,
  pending: state.loginStatus.pending,
  // todayNovel
  novelData: state.todayNovel.novelData,
  novelPending: state.todayNovel.novelPending,
  // notification
  notificationStatus: state.notification.notificationStatus,
  notiPending: state.notification.notiPending,
  notifications: state.notification.notifications,
  readPending: state.notification.readPending,
  notiOffset: state.notification.notiOffset,
  notiLimit: state.notification.notiLimit,
  notiCount: state.notification.notiCount,
});

const mapDispatchToProps = dispatch => ({
  LoginStateActions: bindActionCreators(loginActions, dispatch),
  TodayNovelActions: bindActionCreators(todayNovel, dispatch),
  NotificationActions: bindActionCreators(notifications, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
