import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@blueprintjs/core';

const NovellaListItem = (props) => {
  const {
    novellaName,
    novellaContent,
    author,
    authorInfo,
    className,
  } = props;

  return (
    <div className={className}>
      <Card interactive>
        <h1>{ novellaName }</h1>
        <br />
        <h3>{ novellaContent }</h3>
        <br />
        <div style={{ display: 'flex', flexDirection: 'row', flex: 5 }}>
          <div style={{
            flex: 0.25,
            paddingRight: '2px',
            borderRadius: 180,
            backgroundColor: 'black',
            }}
          />
          <div stlye={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
            <h4>{ author }</h4>
            <div style={{ color: '#C1C1C1' }}>{ authorInfo }</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

NovellaListItem.propTypes = {
  novellaName: PropTypes.string.isRequired,
  novellaContent: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorInfo: PropTypes.string.isRequired,
};

export default NovellaListItem;
