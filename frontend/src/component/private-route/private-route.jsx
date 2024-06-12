import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({
  authorizationStatus, requiredAuthorizationStatus, children, declinedElement,
}) => (
  requiredAuthorizationStatus === authorizationStatus
    ? children
    : <Navigate to={declinedElement} />
);
