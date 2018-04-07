import React, { Fragment } from 'react';
import ClassNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './UserIcon.scss';

const cx = ClassNames.bind(styles);

class UserIcon extends React.Component {
  componentDidMount() {
  }

  render() {
    const {
      username,
      profilePicture,
    } = this.props.userData;

    return (
      <Fragment>
        <img className={cx('round-icon')} src={`/api/user/profile-pic/${username}`} alt="profile" />
      </Fragment>
    );
  }
}
export default UserIcon;
