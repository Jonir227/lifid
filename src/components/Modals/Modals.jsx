import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Register from './Register';
import TodayNovelAdd from './TodayNovelAdd';

const Modals = ({
  modalState,
  modalModify,
  login,
  calLastDayOfMonth,
}) => {
  let CurrentModal = null;
  let defaultProps = Object.assign({}, { modalState, modalModify });
  switch (modalState) {
    case 'Login':
      CurrentModal = Login;
      defaultProps = Object.assign({}, defaultProps, { login });
      break;
    case 'Register':
      CurrentModal = Register;
      break;
    case 'Exit':
      modalModify(modalState);
      break;
    case 'Add':
      CurrentModal = TodayNovelAdd;
      defaultProps = Object.assign({}, defaultProps, { calLastDayOfMonth });
      break;
    default:
      CurrentModal = Login;
  }
  return (
    React.createElement(CurrentModal, defaultProps)
  );
};

Modals.propTypes = {
  modalState: PropTypes.string.isRequired,
  modalModify: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  calLastDayOfMonth: PropTypes.func.isRequired,
};

export default Modals;
