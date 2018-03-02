import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Elevation } from '@blueprintjs/core';

const TodayNovel = ({ style }) => {
  return (
    <Fragment>
      <div style={style}>
        <Card interactive elevation={Elevation.THREE}>
          <h3>today&apos;s novel is <strong>neuromancer</strong>.</h3>
          <br />
          <h2>&quot; 항구의 하늘은 방송이 끝난 텔레비전 색이였다 &quot;</h2>
        </Card>
      </div>
    </Fragment>
  );
};

TodayNovel.PropTypes = {
  style: PropTypes.object.isRequired,
};


export default TodayNovel;
