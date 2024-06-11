import {unwrapResult} from "@reduxjs/toolkit";
import classNames from "classnames";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {AppRoute} from "../../const.js";
import {loginAction} from "../../store/api-action/user-api-action.js";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values, {setSubmitting, setFieldError}) => {
    try {
      const resultAction = await dispatch(loginAction({
        username: values.username,
        password: values.password,
      }));
      const data = unwrapResult(resultAction);
      toast.success(`Logging user '${data.username}' is successful`, {
        position: 'top-right'
      });
      navigate(AppRoute.Main);
    } catch (error) {
      toast.error('Logging failed. Please try again.', {
        position: 'top-right'
      });
      if (error === "Unauthorized") {
        setFieldError('username', 'Неверные имя пользователя или пароль');
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
            alt="Войти"
          />
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({isSubmitting, errors, touched}) => (
            <Form className="col-12 col-md-6 mt-3 mt-mb-0">
              <h1 className="text-center mb-4">Войти</h1>
              <div className="form-floating mb-3">
                <Field
                  name="username"
                  autoComplete="username"
                  id="username"
                  className={classNames('form-control', {'is-invalid': errors.username && touched.username})}
                />
                <label htmlFor="username">Ваш ник</label>
                <ErrorMessage name="username" component="div" className="invalid-feedback"/>
              </div>
              <div className="form-floating mb-4">
                <Field
                  name="password"
                  autoComplete="current-password"
                  type="password"
                  id="password"
                  className={classNames('form-control', {'is-invalid': errors.password && touched.password})}
                />
                <label className="form-label" htmlFor="password">Пароль</label>
                <ErrorMessage name="password" component="div" className="invalid-feedback"/>
              </div>
              <button
                type="submit"
                className="w-100 mb-3 btn btn-outline-primary"
                disabled={isSubmitting}
              >Войти
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>Нет аккаунта?</span> <Link to={AppRoute.Register}>Регистрация</Link>
        </div>
      </div>
    </div>
  );
}
