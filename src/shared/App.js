import React, { Fragment, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import classNames from 'classnames/bind'; import PropTypes from 'prop-types';
import { FocusStyleManager } from '@blueprintjs/core';
import axios from 'axios';
import { PropsRoute } from 'util/RouterUtil';
import { ContentBody, Editor, ReaderView } from 'pages';
import { BtmFooter, TopNavbar } from 'components';
import styles from 'styles/base.scss';

const cx = classNames.bind(styles);

class App extends Component {
  componentDidMount() {
    this.props.checkUser();
    axios.defaults.headers['x-access-token'] = localStorage.getItem('token');
    // axios.post('/api/today-novel', {
    //   name: 'neuromancer',
    //   author: ' William Gibson',
    //   quotation: '항구의 하늘은 방송이 끝난 텔레비전 색이였다.',
    //   dueDate: '2018-4-30',
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
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
            !isLoggedIn && <Redirect to="/" />
          }
          <PropsRoute exact path="/" component={ContentBody} novelData={novelData} userData={userData} />
          <PropsRoute exact path="/editor" component={Editor} novelData={novelData} userData={userData} isLoggedIn={isLoggedIn} />
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
