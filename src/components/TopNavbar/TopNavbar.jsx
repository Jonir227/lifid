import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alignment, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Button } from '@blueprintjs/core';
import classNames from 'classnames/bind';
import { Modals, UserIcon } from 'components';
import SearchBar from './SearchBar';
import styles from './TopNavbar.scss';

const cx = classNames.bind(styles);

const BtnTxt = ({ txt }) => <span className={cx('btn-text')}>{txt}</span>;

BtnTxt.propTypes = {
  txt: PropTypes.string.isRequired,
};

class TopNavbar extends Component {
  // isLoginOpen 상태에 따라서 Login component의 랜더링 여부 결정.
  state = {
    modalState: 'Exit',
    isSearchOut: false,
  }

  modalModify = (modalAction) => {
    this.setState({
      modalState: modalAction,
    });
  }

  toggleSearchBar = boolean => () => {
    this.setState({
      isSearchOut: boolean,
    });
  }

  render() {
    const {
      modalState,
    } = this.state;

    const {
      modalModify,
    } = this;

    const {
      login,
      logout,
      isLoggedIn,
      userData,
      pending,
      notiOffset,
      notiLimit,
      notiCount,
      fetchNotifications,
      readNotification,
      notificationStatus,
      notiPending,
      notifications,
      readPedning,
    } = this.props;

    console.log(this.props, this.props.notifications);

    return (
      <Fragment>
        <Navbar className={cx('top-nav-bar')}>
          <NavbarGroup align={Alignment.LEFT}>
            <Link to="/"><NavbarHeading><strong>LiFiD</strong></NavbarHeading></Link>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <Button
              className="pt-minimal"
              icon="search"
              onClick={this.toggleSearchBar(true)}
            />
            {
              this.state.isSearchOut &&
                <SearchBar
                  toggleSearchBar={this.toggleSearchBar(false)}
                  novelData={this.props.novelData}
                />
            }
            <NavbarDivider />
            {
              !pending && !isLoggedIn && notificationStatus ?
                <Fragment>
                  <Button
                    className="pt-minimal"
                    icon="log-in"
                    text={<BtnTxt txt="Log in" />}
                    onClick={() => { modalModify('Login'); }}
                  />
                  <Button
                    className="pt-minimal"
                    icon="follower"
                    text={<BtnTxt txt="Register" />}
                    onClick={() => { modalModify('Register'); }}
                  />
                </Fragment>
              :
                <Fragment>
                  <Link to="/my-novellas">
                    <Button
                      className="pt-minimal"
                      icon="edit"
                      text={<BtnTxt txt="작성중인 글 보기" />}
                    />
                  </Link>
                  <NavbarDivider />
                  <UserIcon
                    userData={userData}
                    logout={logout}
                    // notification data
                    notiOffset={notiOffset}
                    notiLimit={notiLimit}
                    notiCount={notiCount}
                    fetchNotifications={fetchNotifications}
                    readNotification={readNotification}
                    notificationStatus={notificationStatus}
                    notifications={notifications}
                    notiPending={notiPending}
                    readPedning={readPedning}
                  />
                </Fragment>
            }
          </NavbarGroup>
        </Navbar>
        {
          (modalState !== 'Exit') &&
            <Modals
              modalState={modalState}
              modalModify={this.modalModify}
              login={login}
              isLoggedIn={isLoggedIn}
            />
        }
      </Fragment>
    );
  }
}


export default TopNavbar;
