import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Register from './Register';

const Modals = ({ modalState, modalModify, login }) => {
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
};

export default Modals;
