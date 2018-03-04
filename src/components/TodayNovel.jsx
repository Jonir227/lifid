import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Elevation } from '@blueprintjs/core';

const TodayNovel = ({ style, todayNovelData }) => {
  return (
    <Fragment>
      <div style={style}>
        <Card interactive elevation={Elevation.THREE}>
          <h3>today&apos;s novel is <strong>{todayNovelData.name}</strong>.</h3>
          <br />
          <h2>&quot; {todayNovelData.quotation} &quot;</h2>
        </Card>
      </div>
    </Fragment>
  );
};

TodayNovel.propTypes = {
  style: PropTypes.objectOf(PropTypes.string).isRequired,
  todayNovelData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quotation: PropTypes.string.isRequired,
  }).isRequired,
};


export default TodayNovel;
