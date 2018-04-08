import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as loginActions from 'store/modules/loginStatus';
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

  render() {
    const {
      handleLogin,
      handleLogout,
      handleCheckUser,
    } = this;

    const {
      isLoggedIn,
      userData,
    } = this.props;

    return (
      <App
        login={handleLogin}
        logout={handleLogout}
        isLoggedIn={isLoggedIn}
        userData={userData}
        checkUser={handleCheckUser}
      />
    );
  }
}

AppContainer.propTypes = {
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

const mapStateToProps = state => ({
  isLoggedIn: state.loginStatus.isLoggedIn,
  userData: state.loginStatus.userData,
});

const mapDispatchToProps = dispatch => ({
  LoginStateActions: bindActionCreators(loginActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
