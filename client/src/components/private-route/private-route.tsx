import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { getAuthStatus } from "../../redux/user/selectors";
import { AppRoute, AuthStatus } from "../../const";

type PrivateRouteProps = {
  children: JSX.Element;
  requiredAuthStatus: AuthStatus
};

export const PrivateRoute = ({children, requiredAuthStatus}: PrivateRouteProps): JSX.Element => {
  const authStatus = useAppSelector(getAuthStatus);
  return (
    authStatus === requiredAuthStatus
    ? children
    : <Navigate to={AppRoute.Main} />
  );
};
