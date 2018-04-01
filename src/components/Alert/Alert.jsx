import React, { Fragment } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Alert.scss';

const cx = classNames.bind(styles);

class Alert extends React.PureComponent {

  state = {
    showAlert: false,
  }

  render() {
    const {
      message,
    } = this.props;
    return (
      <Fragment>
        {
          this.state.showAlert && (
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

export default Alert;
