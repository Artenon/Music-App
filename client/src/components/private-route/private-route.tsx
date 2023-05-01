import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { getAuthStatus, getIsAuthLoading } from "../../redux/user/selectors";
import { AppRoute, AuthStatus } from "../../const";
import { Spinner } from "../spinner/spinner";

type PrivateRouteProps = {
  children: JSX.Element;
  requiredAuthStatus: AuthStatus;
};

export const PrivateRoute = ({children, requiredAuthStatus}: PrivateRouteProps): JSX.Element => {
  const authStatus = useAppSelector(getAuthStatus);
  const isAuthLoading = useAppSelector(getIsAuthLoading);
  
  return (
    isAuthLoading
    ? <Spinner />
    : authStatus === requiredAuthStatus
      ? children
      : <Navigate to={AppRoute.Main} />
  );
};
