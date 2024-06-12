import { Header } from '../../component/header/header.jsx';
import { Login } from '../../component/login/login.jsx';

export const LoginPage = () => (
  <div className="container-fluid h-100 ">
    <Header />
    <div className="row justify-content-center align-content-center h-100 my-5">
      <div className="col-12 col-md-8 col-xxl-6 ">
        <Login />
      </div>
    </div>
  </div>
);
