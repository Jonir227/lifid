import axios from 'axios';

const checkAuth = () => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    let result;
    axios.post('/api/auth/check', jwt)
      .then((res) => { result = res.data.success; });
    return result;
  }
  return false;
};

export default checkAuth;
