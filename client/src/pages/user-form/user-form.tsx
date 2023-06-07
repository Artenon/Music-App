import { useState, FormEvent, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColorRing } from "react-loader-spinner";
import { faUserLarge, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../hooks/hooks";
import { getEmail, getUsername } from "../../redux/user/selectors";

const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const UserForm = (): JSX.Element => {
  const username = useAppSelector(getUsername);
  const email = useAppSelector(getEmail);

  const [formData, setFormData] = useState<{email: string, username: string}>({ email, username });
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      checkEmailValid(e.target.value);
    }
  };

  const checkEmailValid = (email: string) => {
    email.match(validEmailRegex)
    ? setIsEmailValid(true)
    : setIsEmailValid(false);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmailValid) {

    };
  };

  return (
    <div className="login">
      <div className="container col-10">
        <div className="login__header">
          <div className="logo">
            <FontAwesomeIcon icon={faUserLarge} />
          </div>
          <h3>Update Info</h3>     
        </div>
        <form className="login__form" onSubmit={submitHandler}>
          <div className="mb-3 inputBox">
            <FontAwesomeIcon className="icon" icon={faUser} />
            <input 
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={changeHandler}
            />
            <label>Username</label>
          </div>

          <div className="mb-3 inputBox">
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
            <input 
              type="text"
              name="email"
              required
              value={formData.email}
              onChange={changeHandler}
            />
            <label>Email</label>
            {
              !isEmailValid
              ? <div className="hint">Invalid Email</div>
              : null
            }
          </div>

          <button type="submit" className="login__button">
            {
              /* isLoginLoading
              ? <div>
                  <ColorRing
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{"margin": "0 auto"}}
                    colors={['#121212', '#121212', '#121212', '#121212', '#121212']}
                  />
                </div>
              :  */"Update"
            }
          </button>
        </form>
      </div>
    </div>
  )
};