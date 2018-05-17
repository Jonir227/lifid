import React, { Fragment, Component } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import classNames from 'classnames/bind'; import PropTypes from 'prop-types';
import { FocusStyleManager } from '@blueprintjs/core';
<<<<<<< HEAD
import { PropsRoute, PrivateRoute } from 'util/RouterUtil';
import { ContentBody, Editor, ReaderView, MyNovelList } from 'pages';
=======
import { PropsRoute } from 'util/RouterUtil';
import { ContentBody, Editor, ReaderView, MyNovelList, AdminView } from 'pages';
>>>>>>> d9de7fb88b25d583e3195ea947939a962cd4c215
import { BtmFooter, TopNavbar } from 'components';
import styles from 'styles/base.scss';

const cx = classNames.bind(styles);

class App extends Component {
  componentDidMount() {
    this.props.checkUser();
    this.props.getTodayNovel();
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
      novelData,
    } = this.props;

    return (
      <Fragment>
        <TopNavbar
          login={login}
          logout={logout}
          isLoggedIn={isLoggedIn}
          userData={userData}
          pending={pending}
        />
        <div className={cx('content-body')}>
<<<<<<< HEAD
          <PropsRoute exact path="/" component={ContentBody} novelData={novelData} userData={userData} />
          <PrivateRoute exact path="/my-novellas" isLoggedIn={isLoggedIn} component={MyNovelList} redirectTo="/" />
=======
          {
            !pending && !isLoggedIn && <Redirect to="/" />
          }
          <PropsRoute exact path="/" component={ContentBody} novelData={novelData} userData={userData} isLoggedIn={isLoggedIn} />
          <PropsRoute exact path="/my-novellas" component={MyNovelList} />
>>>>>>> d9de7fb88b25d583e3195ea947939a962cd4c215
          <Switch>
            <PrivateRoute path="/my-novellas/editor/:docNo" isLoggedIn={isLoggedIn} component={Editor} novelData={novelData} userData={userData} redirectTo="/" />
            <PrivateRoute path="/my-novellas/editor" component={Editor} novelData={novelData} userData={userData} isLoggedIn={isLoggedIn} redirectTo="/" />
          </Switch>
          <PropsRoute exact path="/reader" component={ReaderView} />
          <PropsRoute exact path="/admin" component={AdminView} novelData={novelData} />
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
  pending: PropTypes.func.isRequired,
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
