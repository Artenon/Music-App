import { useState } from "react";
import { IoIosColorFill } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import { getTheme } from "../../redux/user/selectors";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { changeTheme } from "../../redux/user/user-slice";

export const Theme = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentTheme = useAppSelector(getTheme);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  const themeHandler = (css: string) => {
    const body = document.querySelector('body');
    body?.style.setProperty('--gradient', css);
    dispatch(changeTheme(css));
  };

  const themes = [
    {
      id: 0,
      theme: "bg-gradient-to-t from-gray-600 to-gray-800",
      css: "linear-gradient(to top, #4B5563 0%, #111827 100%)"
    },
    {
      id: 1,
      theme: "bg-gradient-to-t from-red-700 to-red-900",
      css: "linear-gradient(to top, #700000 0%, #260000 100%)"
    },
    {
      id: 2,
      theme: "bg-gradient-to-t from-sky-700 to-sky-900",
      css: "linear-gradient(to top, #00324e 0%, #00131e 100%)"
    },
    {
      id: 3,
      theme: "bg-gradient-to-t from-green-800 to-green-900",
      css: "linear-gradient(to top, #004319 0%, #001709 100%)"
    },
    {
      id: 4,
      theme: "bg-gradient-to-t from-gray-800 to-black",
      css: "linear-gradient(to top, #1f2937 0%, #000 100%)"
    },
    {
      id: 5,
      theme: "bg-gradient-to-t from-red-400 to-rose-900",
      css: "linear-gradient(to top, #CA7968 0%, #2b0012 100%)"
    },
  ];

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
          themes.map((theme, index) => (
            <div 
              key={theme.id}
              className={`
                w-[20px] h-[20px] bg-transparent rounded-sm cursor-pointer 
                ${theme.theme} ${isOpen && "animate-floatInTheme"}
                flex items-center justify-center
              `}
              onClick={() => themeHandler(theme.css)}
            >
              { 
                (theme.css === currentTheme || (index === 0 && currentTheme === null))
                && <BsCheckLg className="text-white text-xl bg-black/30 rounded-sm" />
              } 
            </div>
          ))
        }
      </div>
    </div>
  );
};
