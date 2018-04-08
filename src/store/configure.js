import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import modules from './modules';


const configure = () => {
  const logger = createLogger();
  const store = createStore(modules, applyMiddleware(logger, ReduxThunk));
  return store;
};

export default configure;
