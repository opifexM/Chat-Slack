import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute } from '../../const.js';
import { loginAction } from '../../store/api-action/user-api-action.js';

// eslint-disable-next-line import/prefer-default-export
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const resultAction = await dispatch(loginAction({
        username: values.username,
        password: values.password,
      }));
      const { username } = unwrapResult(resultAction);
      toast.success(t('user.loginSuccess', { username }), {
        position: 'top-right',
      });
      navigate(AppRoute.Main);
    } catch (error) {
      toast.error(t('user.loginFail'), {
        position: 'top-right',
      });
      if (error === 'Unauthorized') {
        setFieldError('username', t('user.wrongNamePassword'));
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img
            src="/img/login-logo.jpeg"
            className="rounded-circle"
            alt={t('user.login')}
          />
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="col-12 col-md-6 mt-3 mt-mb-0">
              <h1 className="text-center mb-4">{t('user.login')}</h1>
              <div className="form-floating mb-3">
                <Field
                  name="username"
                  autoComplete="username"
                  id="username"
                  className={classNames('form-control', { 'is-invalid': errors.username && touched.username })}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="username">{t('user.nick')}</label>
                <ErrorMessage name="username" component="div" className="invalid-feedback" />
              </div>
              <div className="form-floating mb-4">
                <Field
                  name="password"
                  autoComplete="current-password"
                  type="password"
                  id="password"
                  className={classNames('form-control', { 'is-invalid': errors.password && touched.password })}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="form-label" htmlFor="password">{t('user.password')}</label>
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>
              <button
                type="submit"
                className="w-100 mb-3 btn btn-outline-primary"
                disabled={isSubmitting}
              >
                {t('user.login')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>{t('user.noAccount')}</span>
          {' '}
          <Link to={AppRoute.Register}>{t('user.registration')}</Link>
        </div>
      </div>
    </div>
  );
};
