import _ from 'lodash';

const lazyLoad = (loadFunc) => {
  const newFunc = _.throttle(() => {
    if ((window.innerHeight + window.scrollY) / (document.body.offsetHeight - 500) >= 1) {
      loadFunc();
    }
  }, 500);
  window.addEventListener('scroll', newFunc);
};

export default lazyLoad;
