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
import { registerAction } from '../../store/api-action/user-api-action.js';
import { registrationValidationSchema } from './registration-validation-schema.js';

// eslint-disable-next-line import/prefer-default-export
export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',

  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const resultAction = await dispatch(registerAction({
        username: values.username,
        password: values.password,
      }));
      const { username } = unwrapResult(resultAction);
      toast.success(t('user.registerSuccess', { username }), {
        position: 'top-right',
      });
      navigate(AppRoute.Main);
    } catch (error) {
      if (error === 'Conflict') {
        setFieldError('username', t('user.userExists'));
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <img
            src="/img/registration-logo.jpg"
            className="rounded-circle"
            alt={t('user.registration')}
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={registrationValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="w-50">
              <h1 className="text-center mb-4">{t('user.registration')}</h1>
              <div className="form-floating mb-3">
                <Field
                  name="username"
                  autoComplete="username"
                  id="username"
                  className={classNames('form-control', { 'is-invalid': errors.username && touched.username })}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="username">{t('user.name')}</label>
                <ErrorMessage name="username" component="div" className="invalid-feedback" />
              </div>
              <div className="form-floating mb-3">
                <Field
                  name="password"
                  aria-describedby="passwordHelpBlock"
                  autoComplete="new-password"
                  type="password"
                  id="password"
                  className={classNames('form-control', { 'is-invalid': errors.password && touched.password })}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="password">{t('user.password')}</label>
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>
              <div className="form-floating mb-4">
                <Field
                  name="confirmPassword"
                  autoComplete="new-password"
                  type="password"
                  id="confirmPassword"
                  className={classNames('form-control', { 'is-invalid': errors.confirmPassword && touched.confirmPassword })}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="confirmPassword">{t('user.confirmPassword')}</label>
                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
              </div>
              <button
                type="submit"
                className="w-100 btn btn-outline-primary"
                disabled={isSubmitting}
              >
                {' '}
                {t('user.registrationProcess')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>{t('user.haveAccount')}</span>
          {' '}
          <Link to={AppRoute.Login}>{t('user.login')}</Link>
        </div>
      </div>
    </div>
  );
};
