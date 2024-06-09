import {Navigate} from 'react-router-dom';

export function PrivateRoute({ authorizationStatus, requiredAuthorizationStatus, children, declinedElement }) {
  return (
    requiredAuthorizationStatus === authorizationStatus
      ? children
      : <Navigate to={declinedElement}/>
  );
}
