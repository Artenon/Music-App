import { useLocation } from "react-router-dom";
import { Login } from "../../components/login/login";
import { Register } from "../../components/login/register";
import { AppRoute } from "../../const";

export const LoginPage = (): JSX.Element => {
  const location = useLocation();

  return (
    <div className="login">
      {
        location.pathname === AppRoute.Login
        ? <Login />
        : <Register />
      }
    </div>
  );
}
