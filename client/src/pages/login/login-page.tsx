import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { getAuthStatus} from "../../redux/auth/selectors";
import { AppRoute, AuthStatus } from "../../const";
import Login from "../../components/login/login";
import Register from "../../components/login/register";

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    if (authStatus === AuthStatus.Authorized) {
      navigate(AppRoute.Main);
    };
  }, [authStatus, navigate]);

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

export default LoginPage;
