import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColorRing } from "react-loader-spinner";
import { faKey, faLock, faEnvelope, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { loginAction } from "../../redux/user/api-actions";
import { getIsLoginLoading } from "../../redux/user/selectors";
import { User } from '../../types/auth.types';
import { AppRoute } from "../../const";

export const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<User>({ email: '', password: '' });
  const isLoginLoading = useAppSelector(getIsLoginLoading);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginAction(formData));
  };

  return (
    <div className="container col-10">
      <div className="login__header">
        <div className="logo">
          <FontAwesomeIcon icon={faKey} />
        </div>        
        <h3>Sign In</h3>
      </div>
      <form className="login__form" onSubmit={submitHandler}>
        <div className="mb-3 inputBox">
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
          <input 
            type="text"
            name="email"
            required
            onChange={changeHandler}
          />
          <label>Email</label>
        </div>

        <div className="mb-3 inputBox">
          <FontAwesomeIcon className="icon" icon={faLock} />
          <input
            type="password"
            name="password"
            required
            onChange={changeHandler}
          />
          <label>Password</label>
        </div>
        
        <Link className="signup_link" to={AppRoute.Register}>
          <FontAwesomeIcon icon={faUserPlus} /> Sign Up
        </Link>
        <button type="submit" className="login__button">
          {
            isLoginLoading
            ? <div>
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  wrapperStyle={{"margin": "0 auto"}}
                  colors={['#121212', '#121212', '#121212', '#121212', '#121212']}
                />
              </div>
            : "Login"
          }
        </button>
      </form>
    </div>
  );
}
