import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute } from '../../const.js';
import { registerAction } from '../../store/api-action/user-api-action.js';
import { registrationValidationSchema } from './registration-validation-schema.js';

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const data = unwrapResult(resultAction);
      toast.success(`Registration user '${data.username}' is successful`, {
        position: 'top-right',
      });
      toast.info('You are logged in to the system', {
        position: 'top-right',
      });
      navigate(AppRoute.Main);
    } catch (error) {
      toast.error('Registration failed. Please try again.', {
        position: 'top-right',
      });
      if (error === 'Conflict') {
        setFieldError('username', 'Такой пользователь уже существует');
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
            alt="Регистрация"
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={registrationValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="w-50">
              <h1 className="text-center mb-4">Регистрация</h1>
              <div className="form-floating mb-3">
                <Field
                  name="username"
                  autoComplete="username"
                  id="username"
                  className={classNames('form-control', { 'is-invalid': errors.username && touched.username })}
                />
                <label htmlFor="username">Имя пользователя</label>
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
                <label htmlFor="password">Пароль</label>
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
                <label htmlFor="confirmPassword">Подтвердите пароль</label>
                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
              </div>
              <button
                type="submit"
                className="w-100 btn btn-outline-primary"
                disabled={isSubmitting}
              >
                {' '}
                Зарегистрироваться
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>Есть аккаунт?</span>
          {' '}
          <Link to={AppRoute.Login}>Войти</Link>
        </div>
      </div>
    </div>
  );
};
