import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './views/App';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App compiler="TypeScript" framework="React" />
  </Provider>,
  document.getElementById('example')
);
