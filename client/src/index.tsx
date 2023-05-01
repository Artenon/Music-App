import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './redux/store';
import { getAuthStatus } from './redux/user/api-actions';
import App from './app/App';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

store.dispatch(getAuthStatus());

root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
