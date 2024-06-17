import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Header } from '../../component/header/header.jsx';
import { AppRoute } from '../../const';

// eslint-disable-next-line import/prefer-default-export
export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <Header />
      <div className="text-center my-5">
        <img
          alt={t('notFound.noPage')}
          className="img-fluid h-25"
          src="/img/login-logo.jpeg"
        />
        <h1 className="h4 text-muted">{t('notFound.noPage')}</h1>
        <p className="text-muted">
          {t('notFound.redirectStart')}
          <Link to={AppRoute.Main}>{t('notFound.redirectStop')}</Link>
        </p>
      </div>
    </div>
  );
};
