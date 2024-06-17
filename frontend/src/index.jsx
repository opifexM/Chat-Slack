import ReactDOM from 'react-dom/client';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { App } from './app.jsx';
import { LoadingScreen } from './component/loading-screen/loading-screen.jsx';
import { initializeI18n } from './i18n';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'production',
};

const i18n = initializeI18n();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProviderRollbar config={rollbarConfig}>
    <Provider store={store}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <ToastContainer />
          <LoadingScreen />
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  </ProviderRollbar>,
);
