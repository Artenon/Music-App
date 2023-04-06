import { useAppDispatch } from "../../hooks/hooks"; 
import { logoutAction } from "../../redux/auth/api-actions";

const Logout = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="account">
      <div className="account__logout" onClick={logoutHandler}>Logout</div>
    </div>
  );
};

export default Logout;