import React from 'react';
import PropTypes from 'prop-types';
import { Card, Elevation } from '@blueprintjs/core';

const itemStyle = {
  padding: 10,
};

const NovellaListItem = (props) => {
  const {
    novellaName,
    novellaContent,
    author,
  } = props;

  return (
    <div style={itemStyle}>
      <Card interactive elevation={Elevation.TWO}>
        <h1>{ novellaName }</h1>
        <h4 style={{ textAlign: 'right' }}>{ author }</h4>
        <h3>{ novellaContent }</h3>
      </Card>
    </div>
  );
};

NovellaListItem.propTypes = {
  novellaName: PropTypes.string.isRequired,
  novellaContent: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default NovellaListItem;
