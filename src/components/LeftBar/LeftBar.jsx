import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@blueprintjs/core';

const LeftBar = ({ sections, indexFunction }) => {
  return (
    <div style={{ padding: 10, width: '15rem' }}>
      <Card >
        Left bar is he0re&nbsp;
        <br />
        alsdkjfasdflkd
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Card>
    </div>
  );
};

LeftBar.propTypes = {
  sections: PropTypes.objectOf(PropTypes.string).isRequired,
  indexFunction: PropTypes.func.isRequired,
};

export default LeftBar;
