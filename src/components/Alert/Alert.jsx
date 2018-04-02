import React, { Fragment } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Alert.scss';

const cx = classNames.bind(styles);

class Alert extends React.PureComponent {
  render() {
    const {
      message,
      showAlert,
    } = this.props;
    return (
      <Fragment>
        {
          showAlert && (
            <div className={cx('background')}>
              <div className={cx('alert')}>
                {message}
              </div>
            </div>
          )
        }
      </Fragment>
    );
  }
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  showAlert: PropTypes.bool.isRequired,
};

export default Alert;
