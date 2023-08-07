import { useState, useEffect } from "react";
import { IoIosColorFill } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import { ThreeDots } from "react-loader-spinner";
import { getTheme } from "../../redux/user/selectors";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { changeTheme } from "../../redux/user/user-slice";
import { getThemes, getIsThemesLoading } from "../../redux/data/selectors";
import { getThemesAction } from "../../redux/data/api-actions";

export const Theme = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentTheme = useAppSelector(getTheme);
  const themes = useAppSelector(getThemes);
  const isThemesLoading = useAppSelector(getIsThemesLoading);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  const themeHandler = (css: string) => {
    const body = document.querySelector('body');
    body?.style.setProperty('--gradient', css);
    dispatch(changeTheme(css));
  };

  useEffect(() => {
    dispatch(getThemesAction());
  }, [dispatch]);

  return (
    <div className="fixed bottom-4 right-6">
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
          ? <RxCross2 className="animate-floatIn text-gray-800" />
          : <IoIosColorFill className="animate-floatIn" />
        }
      </div>
      <div 
        className={`
          absolute flex backdrop-blur-xl shadow-extra rounded-md p-2 gap-2 transition-all
          ${isOpen
            ? "scale-100 opacity-100 top-1 right-14"
            : "scale-50 opacity-0 top-0 right-2 invisible"}
        `}
      >
        {
          isThemesLoading
          ? 
            <ThreeDots
              visible={true}
              height="20"
              width="30"
              wrapperStyle={{"margin": "0 auto"}}
              color="#fff"
            />
          :
            themes.map((theme) => (
              <div 
                key={theme.id}
                style={{background: theme.theme}}
                className={`
                  w-[20px] h-[20px] rounded-sm cursor-pointer
                  ${isOpen && "animate-floatInTheme"}
                  flex items-center justify-center
                `}
                onClick={() => themeHandler(theme.css)}
              >
                { 
                  (theme.css === currentTheme)
                  && <BsCheckLg className="text-white text-xl bg-black/30 rounded-sm" />
                } 
              </div>
            ))
        }
      </div>
    </div>
  );
};
