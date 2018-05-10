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
          <div>{ novellaName }</div>
          <br />
          <div>{ novellaContent }</div>
          <br />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            flex: 5,
            }}
          >
            <img style={{ width: 35, height: 35, borderRadius: 30 }} src={`/api/user/profile-pic/${author}`} alt="profile" />
            <div stlye={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
              <div>{ author }</div>
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
