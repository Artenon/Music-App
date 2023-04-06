import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

const Login = (): JSX.Element => {
  return (
    <div className="account">
      <Link to={AppRoute.Login} className="account__login">Login</Link>
      <Link to={AppRoute.Register} className="account__register">Register</Link>
    </div>
  );
};

export default Login;
