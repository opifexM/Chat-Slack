import {Header} from "../../component/header/header.jsx";

export function NotFoundPage() {
  return (
    <div className="container-fluid h-100">
      <Header/>
      <div className="text-center my-5">
        <img alt="Страница не найдена" className="img-fluid h-25"
             src="/img/login-logo.jpeg"/>
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">Но вы можете перейти <a href="/">на главную страницу</a></p>
      </div>
    </div>
  );
}
