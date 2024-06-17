import { useTranslation } from 'react-i18next';

export const Language = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="dropdown">
      <button className="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        Language
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>EN</button></li>
        <li><button className="dropdown-item" onClick={() => changeLanguage('ru')}>RU</button></li>
      </ul>
    </div>
  );
};
