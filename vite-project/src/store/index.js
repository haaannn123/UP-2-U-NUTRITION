import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import eventReducer from './events';
import logger from 'redux-logger'
import menuReducer from './menus';
import cartReducer from './cart';

const rootReducer = combineReducers({
  session,
  eventReducer,
  menuReducer,
  cartReducer
});


let enhancer;

if (import.meta.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  // const logger = import('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger)); // Use logger as an imported module
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
