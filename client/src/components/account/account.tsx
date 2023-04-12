import { Link } from "react-router-dom";
import { MdAccountCircle, MdOutlineAccountCircle } from "react-icons/md";
import { useAppSelector } from "../../hooks/hooks";
import { getAuthStatus } from "../../redux/auth/selectors";
import { AppRoute, AuthStatus } from "../../const";

export const Account = (): JSX.Element => {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    <div className="fixed top-6 right-6 uppercase text-4xl">
      <Link to={AppRoute.Login}><MdAccountCircle /></Link>
    </div>
  );
};
