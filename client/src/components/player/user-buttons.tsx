import { useState } from "react";
import { TbRepeatOff, TbRepeat } from "react-icons/tb";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getIsAutoPlay } from "../../redux/track/selectors";
import actions from "../../redux/track/track-slice";

const { changeAutoPlay } = actions;

export const UserButtons = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const isAutoPlay = useAppSelector(getIsAutoPlay);

  const repeatHandler = () => {
    dispatch(changeAutoPlay(!isAutoPlay));
  };

  return (
    <div className="flex text-3xl gap-2 pl-4">
      <div className="cursor-pointer" onClick={repeatHandler}>
        {
          isAutoPlay
          ? <TbRepeat title="Turn off Autoplay" />
          : <TbRepeatOff title="Turn on Autoplay" />
        }
      </div>
      <div onClick={() => setIsLiked(!isLiked)} className="cursor-pointer">
        {
          isLiked
          ? <AiFillHeart className="text-rose-600 drop-shadow-heart animate-heartIn" />
          : <AiOutlineHeart className="animate-heartOut" />
        }
      </div>
    </div>
  );
};
