import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import _app from 'components/App/_app';
import { store } from 'store/store';

const container = document.getElementById('root') as HTMLElement;

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <_app />
    </Provider>
  </BrowserRouter>,
);
