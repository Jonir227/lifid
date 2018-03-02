import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Alignment, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Button } from '@blueprintjs/core';

const TopNavbar = () => {
  return (
    <Fragment>
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>LiFiD</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <NavbarDivider />
          <Link to="/"><Button className="pt-minimal" icon="home" text="Home" /></Link>
          <Link to="/editor"><Button className="pt-minimal" icon="edit" text="Start Writing" /></Link>
        </NavbarGroup>
      </Navbar>
    </Fragment>
  );
};

export default TopNavbar;
