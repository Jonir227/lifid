import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@blueprintjs/core';

const LeftBar = ({ sections, indexFunction }) => {
  return (
    <div style={{ padding: 10, width: '15rem' }}>
      <Card >
        Table Of Content
      </Card>
    </div>
  );
};

LeftBar.propTypes = {
  sections: PropTypes.objectOf(PropTypes.string).isRequired,
  indexFunction: PropTypes.func.isRequired,
};

export default LeftBar;
