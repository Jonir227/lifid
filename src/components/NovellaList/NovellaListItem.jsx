import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card } from '@blueprintjs/core';

class NovellaListItem extends Component {

  componentDidMount() {

  }

  render() {
    const {
      novellaName,
      novellaContent,
      author,
      authorInfo,
      className,
    } = this.props;

    return (
      <div className={className}>
        <Card interactive>
          <h1>{ novellaName }</h1>
          <br />
          <h3>{ novellaContent }</h3>
          <br />
          <div style={{ display: 'flex', flexDirection: 'row', flex: 5 }}>
            <img src={`/api/user/profile/${author}`} alt="profile" />
            <div stlye={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
              <h4>{ author }</h4>
              <div style={{ color: '#C1C1C1' }}>{ authorInfo }</div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

NovellaListItem.propTypes = {
  novellaName: PropTypes.string.isRequired,
  novellaContent: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorInfo: PropTypes.string.isRequired,
};

export default NovellaListItem;
