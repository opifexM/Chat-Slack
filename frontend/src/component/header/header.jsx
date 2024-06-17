import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute } from '../../const.js';
import { dropToken } from '../../service/token.js';
import { getIsAuthorized, getUsername } from '../../store/api-communication/api-communcation.selector.js';
import { resetAuthStatus } from '../../store/api-communication/api-communication.slice.js';
import { Language } from '../language/language';

// eslint-disable-next-line import/prefer-default-export
export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getIsAuthorized);
  const username = useSelector(getUsername) ?? 'unknown';
  const { t } = useTranslation();

  function handleLogoutClick() {
    dropToken();
    dispatch(resetAuthStatus());
    toast.success(t('user.logoutSuccess', { username }), {
      position: 'top-right',
    });
    navigate(AppRoute.Login);
  }

  const headerContainer = authorizationStatus ? (
    <button
      onClick={handleLogoutClick}
      type="button"
      className="btn btn-primary"
    >
      (
      {username}
      ) -
      {' '}
      {t('user.logout')}
    </button>
  ) : (
    <Link
      aria-label={t('user.login')}
      className="btn btn-primary"
      to={AppRoute.Login}
    >
      {t('user.login')}
    </Link>
  );

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to={AppRoute.Main} className="navbar-brand">Chat Slack</Link>
          <Language />
        </div>
        {headerContainer}
      </div>
    </nav>
  );
};
