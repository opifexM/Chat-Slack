import { useTranslation } from 'react-i18next';

// eslint-disable-next-line import/prefer-default-export
export const Language = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-link dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {t('language')}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <button className="dropdown-item" type="button" onClick={() => changeLanguage('en')}>EN</button>
        </li>
        <li>
          <button className="dropdown-item" type="button" onClick={() => changeLanguage('ru')}>RU</button>
        </li>
      </ul>
    </div>
  );
};
