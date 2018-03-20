import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alignment, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Button, InputGroup } from '@blueprintjs/core';
import classNames from 'classnames/bind';
import styles from './TopNavbar.scss';

const cx = classNames.bind(styles);

const BtnTxt = ({ txt }) => <span className={cx('btn-text')}>{txt}</span>;

BtnTxt.propTypes = {
  txt: PropTypes.string.isRequired,
};


const TopNavbar = ({ searchFucntion }) => {
  return (
    <Navbar className={cx('top-nav-bar')}>
      <NavbarGroup align={Alignment.LEFT}>
        <Link to="/"><NavbarHeading><strong>LiFiD</strong></NavbarHeading></Link>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <InputGroup
          className="pt-round"
          placeholder="search"
          leftIcon="search"
          rightElement={<Button className="pt-minimal" icon="arrow-right" onClick={searchFucntion} />}
        />
        <NavbarDivider />
        <Link to="/editor">
          <Button
            className="pt-minimal"
            icon="edit"
            text={<BtnTxt txt="Start writing" />}
          />
        </Link>
        <Link to="/login">
          <Button
            className="pt-minimal"
            icon="log-in"
            text={<BtnTxt txt="Log in" />}
          />
        </Link>
      </NavbarGroup>
    </Navbar>
  );
};

TopNavbar.propTypes = {
  searchFucntion: PropTypes.func.isRequired,
};

export default TopNavbar;
