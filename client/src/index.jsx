import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import _app from './components/App/_app';

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <BrowserRouter>
    <_app />
  </BrowserRouter>,
);
