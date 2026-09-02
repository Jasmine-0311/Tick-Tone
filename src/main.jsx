import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store/store.js';

// 保留 Bootstrap 樣式（包含所有 Class）
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/all.scss'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);