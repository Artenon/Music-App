import { useEffect, useState } from "react";
import { TbRepeatOff, TbRepeat } from "react-icons/tb";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getIsAutoPlay, getCurrentTrack } from "../../redux/track/selectors";
import { getFavorites, getAuthStatus } from "../../redux/auth/selectors";
import actions from "../../redux/track/track-slice";
import { addFavorite, removeFavorite } from "../../redux/auth/api-actions";
import { AuthStatus } from "../../const";

const { changeAutoPlay } = actions;

export const UserButtons = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const isAutoPlay = useAppSelector(getIsAutoPlay);
  const currentTrack = useAppSelector(getCurrentTrack);
  const favorites = useAppSelector(getFavorites);
  const authStatus = useAppSelector(getAuthStatus);

  const repeatHandler = () => {
    dispatch(changeAutoPlay(!isAutoPlay));
  };

  const likeHandler = () => {
    if (currentTrack) {
      dispatch(addFavorite(currentTrack));
    };
  };

  const unlikeHandler = () => {
    if (currentTrack) {
      dispatch(removeFavorite(currentTrack));
    }
  };

  useEffect(() => {
    if (currentTrack) {
      if (favorites.filter(item => item.id === currentTrack.id).length !== 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      };
    };
  }, [currentTrack, favorites]);

  return (
    <div className="flex text-3xl gap-2 pl-4">
      <div className="cursor-pointer" onClick={repeatHandler}>
        {
          isAutoPlay
          ? <TbRepeat title="Turn off Autoplay" />
          : <TbRepeatOff title="Turn on Autoplay" />
        }
      </div>
      <div className="cursor-pointer">
        {
          authStatus === AuthStatus.Authorized
          ?
            isLiked
            ? <AiFillHeart onClick={unlikeHandler} className="text-rose-600 drop-shadow-heart animate-heartIn" />
            : <AiOutlineHeart onClick={likeHandler} className="animate-heartOut" />
          : null
        }
      </div>
    </div>
  );
};
