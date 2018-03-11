import React from 'react';
import PropTypes from 'prop-types';
import { Card, Elevation } from '@blueprintjs/core';

const NovellaListItem = (props) => {
  const styles = {
    padding: 3,
  };
  const {
    novellaName,
    novellaContent,
    author,
  } = props;

  return (
    <div style={styles}>
      <Card interactive>
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
