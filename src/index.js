import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './Server';
import { initialState } from './Sesion/initialState';
import { StateProvider } from './Sesion/Store';  //State provider enlaza el reducer y el initialState
//import sesionReducer from './Sesion/reducers/sesionReducer';
import { mainReducer } from './Sesion/reducers/';



ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <App />
    </StateProvider>
  </FirebaseContext.Provider>
  , document.getElementById('root'));


serviceWorker.unregister();
