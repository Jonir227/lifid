import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Alignment, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Button, InputGroup, Icon } from '@blueprintjs/core';
import classNames from 'classnames/bind';
import styles from './TopNavbar.scss';

const cx = classNames.bind(styles);

const TopNavbar = () => {
  return (
    <Navbar className={cx('top-nav-bar')}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading><strong>LiFiD</strong></NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <NavbarDivider />
        <InputGroup
          className="pt-round"
          placeholder="search"
          leftIcon="search"
          rightElement={<Button className="pt-minimal" icon="arrow-right" />}
        />
        <NavbarDivider />
        <Link to="/"><Button className="pt-minimal" icon="home" text="Home" /></Link>
        <Link to="/editor"><Button className="pt-minimal" icon="edit" text="Start Writing" /></Link>
      </NavbarGroup>
    </Navbar>
  );
};

export default TopNavbar;
