import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './component/private-route/private-route.jsx';
import { AppRoute } from './const.js';
import { ChannelPage } from './page/channel-page/channel-page.jsx';
import { LoginPage } from './page/login-page/login-page.jsx';
import { NotFoundPage } from './page/not-found-page/not-found-page.jsx';
import { RegistrationPage } from './page/registration-page/registration-page.jsx';
import { checkAuth } from './service/authorization.js';
import { getIsAuthorized } from './store/api-communication/api-communcation.selector.js';
import { setIsAuthorizedStatus } from './store/api-communication/api-communication.slice.js';
import './i18n';

// eslint-disable-next-line import/prefer-default-export
export const App = ({ RouterComponent = BrowserRouter, routerProps = {} }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkAuth()) {
      dispatch(setIsAuthorizedStatus(true));
    }
  }, [dispatch]);

  const authorizationStatus = useSelector(getIsAuthorized);

  return (
  /* eslint-disable react/jsx-props-no-spreading */
    <RouterComponent {...routerProps}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={(
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus
              declinedElement={AppRoute.Login}
            >
              <ChannelPage />
            </PrivateRoute>
                    )}
        />
        <Route
          path={AppRoute.Login}
          element={(
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={false}
              declinedElement={AppRoute.Main}
            >
              <LoginPage />
            </PrivateRoute>
                    )}
        />
        <Route
          path={AppRoute.Register}
          element={(
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={false}
              declinedElement={AppRoute.Main}
            >
              <RegistrationPage />
            </PrivateRoute>
                    )}
        />
        <Route
          path="*"
          element={
            <NotFoundPage />
                    }
        />
      </Routes>
    </RouterComponent>
  );
};
