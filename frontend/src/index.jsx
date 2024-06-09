import ReactDOM from 'react-dom/client'
import {Provider as ProviderRollbar, ErrorBoundary} from '@rollbar/react'
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import {App} from "./app.jsx";
import {LoadingScreen} from "./component/loading-screen/loading-screen.jsx";
import {store} from './store';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const rollbarConfig = {
  accessToken: '7ef95b719a43469a86a26e0ffad313e8',
  environment: 'testenv',
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProviderRollbar config={rollbarConfig}>
    <Provider store={store}>
      <ErrorBoundary>
        <ToastContainer/>
        <LoadingScreen/>
        <App/>
      </ErrorBoundary>
    </Provider>
  </ProviderRollbar>
);
