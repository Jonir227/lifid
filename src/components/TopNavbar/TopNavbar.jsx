import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alignment, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Button, InputGroup, Icon } from '@blueprintjs/core';
import classNames from 'classnames/bind';
import { Modals, UserIcon } from 'components';
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
  }

  modalModify = (modalAction) => {
    this.setState({
      modalState: modalAction,
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
    } = this.props;

    return (
      <Fragment>
        <Navbar className={cx('top-nav-bar')}>
          <NavbarGroup align={Alignment.LEFT}>
            <Link to="/"><NavbarHeading><strong>LiFiD</strong></NavbarHeading></Link>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <Icon
              className={cx('pt-icon-search')}
              icon="search"
              iconSize={15}
            />
            <InputGroup
              className={cx('pt-round')}
              placeholder="search"
              leftIcon="search"
              rightElement={<Button className="pt-minimal" icon="arrow-right" />}
            />
            <NavbarDivider />
            <Link to="/editor">
              <Button
                className="pt-minimal"
                icon="edit"
                text={<BtnTxt txt="Start writing" />}
              />
            </Link>
            {
              !isLoggedIn &&
              <Button
                className="pt-minimal"
                icon="log-in"
                text={<BtnTxt txt="Log in" />}
                onClick={() => { modalModify('Login'); }}
              />
            }
            {
              isLoggedIn &&
              <Fragment>
                <NavbarDivider />
                <UserIcon userData={userData} />
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
