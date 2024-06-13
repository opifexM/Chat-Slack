import { Navigate } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export const PrivateRoute = ({
  authorizationStatus, requiredAuthorizationStatus, children, declinedElement,
}) => (
  requiredAuthorizationStatus === authorizationStatus
    ? children
    : <Navigate to={declinedElement} />
);
