import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import {Provider} from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import {rootReducer} from './modules/rootReducer';

// для работы Redux devtools добавьте строчку после applyMiddleware(thunk), в createStore
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 

const store = createStore(
  rootReducer, 
  compose(applyMiddleware(thunk)    
  )
);

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);