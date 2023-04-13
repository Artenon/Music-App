import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgMenuGridO } from "react-icons/cg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faRightFromBracket, faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getAuthStatus, getUsername } from "../../redux/auth/selectors";
import { logoutAction } from "../../redux/auth/api-actions";
import { AppRoute, AuthStatus } from "../../const";

const Login = (): JSX.Element => {
  return (
    <Link className="flex items-center gap-1 p-2 rounded-lg transition-all hover:bg-white/10" to={AppRoute.Login}>
      Login
      <FontAwesomeIcon icon={faRightToBracket} />
    </Link>
  );
};

const Logout = ({userName}: {userName: string}): JSX.Element => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="p-2" onClick={logoutHandler}>
        <div className="flex items-center gap-2"><FontAwesomeIcon icon={faUser} /> {userName}</div>
        <div className="flex items-center gap-2"><FontAwesomeIcon icon={faHeart} className="text-rose-600" /> My Favorites</div>
        <button className="flex items-center gap-2"><FontAwesomeIcon icon={faRightFromBracket} /> Logout</button>
    </div>
  );
};

export const Account = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const authStatus = useAppSelector(getAuthStatus);
  const userName = useAppSelector(getUsername);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [authStatus]);

  return (
    <div className="fixed top-4 right-6 z-10">
      <div 
        className="
          cursor-pointer text-4xl
          text-white rounded-full p-1 transition-all
          hover:text-gray-800 hover:bg-white"
        onClick={openHandler}
      >
        <CgMenuGridO />
      </div>
      {
        isOpen &&
        <div className="
          absolute right-10 flex flex-col gap-1
          text-white text-lg rounded-lg font-bold whitespace-nowrap
          backdrop-blur-xl shadow-extra"
        >
          {
            authStatus === AuthStatus.Unauthorized
            ? <Login />
            : <Logout userName={userName} />
          }
        </div>
      }
    </div> 
  );
};
