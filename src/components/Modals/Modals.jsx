import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Register from './Register';

const Modals = ({ modalState, modalModify }) => {
  let CurrentModal = null;
  switch (modalState) {
    case 'Login':
      CurrentModal = Login;
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
    <CurrentModal modalModify={modalModify} />
  );
};

Modals.propTypes = {
  modalState: PropTypes.string.isRequired,
  modalModify: PropTypes.func.isRequired,
};

export default Modals;
