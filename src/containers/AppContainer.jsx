import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as loginActions from 'store/modules/loginStatus';
import * as todayNovel from 'store/modules/todayNovel';
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

  render() {
    const {
      handleLogin,
      handleLogout,
      handleCheckUser,
      handlefetchTodayNovel,
    } = this;

    const {
      isLoggedIn,
      userData,
      pending,
      novelData,
      novelPending,
    } = this.props;

    return (
      <App
        login={handleLogin}
        logout={handleLogout}
        isLoggedIn={isLoggedIn}
        userData={userData}
        pending={pending}
        checkUser={handleCheckUser}
        getTodayNovel={handlefetchTodayNovel}
        novelData={novelData}
        novelPending={novelPending}
      />
    );
  }
}

AppContainer.propTypes = {
  isLoggedIn: PropTypes.bool,
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
  }).isRequired,
  pending: PropTypes.bool,
  novelData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quotation: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
  novelPending: PropTypes.bool,
};

AppContainer.defaultProps = {
  isLoggedIn: false,
  pending: true,
  novelPending: true,
};

const mapStateToProps = state => ({
  isLoggedIn: state.loginStatus.isLoggedIn,
  userData: state.loginStatus.userData,
  pending: state.loginStatus.pending,
  novelData: state.todayNovel.novelData,
  novelPending: state.todayNovel.novelPending,
});

const mapDispatchToProps = dispatch => ({
  LoginStateActions: bindActionCreators(loginActions, dispatch),
  TodayNovelActions: bindActionCreators(todayNovel, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
