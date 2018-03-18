import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@blueprintjs/core';

const NovellaListItem = (props) => {
  const {
    novellaName,
    novellaContent,
    author,
    className,
  } = props;

  return (
    <div className={className}>
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
