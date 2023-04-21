import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgMenuGridO } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
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
    <div className="p-2">
      <div className="
        flex items-center gap-2 p-1 rounded-lg transition-all
        hover:bg-white hover:text-gray-700
      ">
        <FontAwesomeIcon icon={faUser} />{userName}
      </div>
      <div className="
        p-1 rounded-lg transition-all cursor-pointer
        hover:bg-white
      ">
        <Link className="flex items-center gap-2 hover:text-gray-700 transition-all" to={AppRoute.Favorites}>
          <FontAwesomeIcon icon={faHeart} className="text-rose-600" />My Favorites
        </Link>
      </div>
      <div
        className="
          flex items-center gap-2 p-1 rounded-lg transition-all cursor-pointer
          hover:bg-white hover:text-gray-700"
        onClick={logoutHandler}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />Logout
      </div>
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
        className={`
          cursor-pointer text-4xl
          text-white rounded-full p-1 transition-all
          hover:text-gray-800 hover:bg-white
          ${isOpen && "text-gray-800 bg-white"}
        `}
        onClick={openHandler}
      >
        {
          isOpen
          ? <RxCross2 className="animate-floatIn text-gray-800 opacity-100 scale-100" />
          : <CgMenuGridO className="animate-floatIn opacity-100 scale-100" />
        }
      </div>
      <div className={`
        absolute flex flex-col gap-1
        text-white text-lg rounded-lg font-bold whitespace-nowrap
        backdrop-blur-xl shadow-extra
        transition-all
        ${isOpen
          ? "scale-100 opacity-100 right-10 top-10"
          : "scale-50 opacity-0 right-0 top-4 invisible"}
        `}
      >
        {
          authStatus === AuthStatus.Unauthorized
          ? <Login />
          : <Logout userName={userName} />
        }
      </div>
    </div> 
  );
};
