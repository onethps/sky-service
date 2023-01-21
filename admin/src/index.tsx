import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'redux TK/store';

import { App } from '_app';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
