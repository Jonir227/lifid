import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AdminEditor } from 'components';

class AdminView extends React.Component {
  state = {}
  render() {
    const {
      novelData,
    } = this.props;
    return (
      <Fragment>
        <AdminEditor style={{ padding: 5 }} novelData={novelData} />
      </Fragment>
    );
  }
}

export default AdminView;
