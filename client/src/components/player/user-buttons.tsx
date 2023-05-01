import { useEffect, useState } from "react";
import { TbRepeatOff, TbRepeat } from "react-icons/tb";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ColorRing } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getIsAutoPlay, getCurrentTrack } from "../../redux/track/selectors";
import { getFavorites, getAuthStatus, getIsLoading } from "../../redux/user/selectors";
import actions from "../../redux/track/track-slice";
import { addFavoriteTrack, removeFavoriteTrack } from "../../redux/user/api-actions";
import { AuthStatus } from "../../const";

const { changeAutoPlay } = actions;

export const UserButtons = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const isAutoPlay = useAppSelector(getIsAutoPlay);
  const currentTrack = useAppSelector(getCurrentTrack);
  const favorites = useAppSelector(getFavorites);
  const authStatus = useAppSelector(getAuthStatus);
  const isLoading = useAppSelector(getIsLoading);

  const repeatHandler = () => {
    dispatch(changeAutoPlay(!isAutoPlay));
  };

  const likeHandler = () => {
    if (currentTrack) {
      dispatch(addFavoriteTrack(currentTrack));
    };
  };

  const unlikeHandler = () => {
    if (currentTrack) {
      dispatch(removeFavoriteTrack(currentTrack));
    }
  };

  useEffect(() => {
    if (currentTrack) {
      if (favorites.tracks.filter(item => item.id === currentTrack.id).length !== 0) {
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
            isLoading
            ?
              <ColorRing
                visible={true}
                height="30"
                width="30"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
              />
            : isLiked
              ? <AiFillHeart onClick={unlikeHandler} className="text-rose-600 drop-shadow-heart animate-heartIn" />
              : <AiOutlineHeart onClick={likeHandler} className="animate-heartOut" />
          : null
        }
      </div>
    </div>
  );
};
