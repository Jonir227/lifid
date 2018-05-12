import React, { Fragment, Component } from 'react';
import { Redirect, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind'; import PropTypes from 'prop-types';
import { FocusStyleManager } from '@blueprintjs/core';
import axios from 'axios';
import { PropsRoute } from 'util/RouterUtil';
import { ContentBody, Editor, ReaderView, MyNovelList } from 'pages';
import { BtmFooter, TopNavbar } from 'components';
import styles from 'styles/base.scss';

const cx = classNames.bind(styles);

class App extends Component {
  componentDidMount() {
    this.props.checkUser();
    axios.defaults.headers['x-access-token'] = localStorage.getItem('token');
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
          {
            !pending && !isLoggedIn && <Redirect to="/" />
          }
          <PropsRoute exact path="/" component={ContentBody} novelData={novelData} userData={userData} />
          <PropsRoute exact path="/my-novellas" component={MyNovelList} />
          <Switch>
            <PropsRoute path="/my-novellas/editor/:docNo" component={Editor} novelData={novelData} userData={userData} isLoggedIn={isLoggedIn} />
            <PropsRoute path="/my-novellas/editor" component={Editor} novelData={novelData} userData={userData} isLoggedIn={isLoggedIn} />
          </Switch>
          <PropsRoute exact path="/reader" component={ReaderView} />
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
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
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
