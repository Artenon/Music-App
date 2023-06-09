import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiPlay, HiPause } from "react-icons/hi";
import { BsFillExplicitFill } from "react-icons/bs";
import { TrackData } from "../../types/music.types";
import actions from "../../redux/track/track-slice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getCurrentTrack, getIsPlaying, getQueue } from "../../redux/track/selectors";
import { getSearchData } from "../../redux/data/selectors";
import { AppRoute } from "../../const";

type CardProps = {
  item: TrackData;
  index: number;
};

const { changeCurrentTrack, changeIsPlaying, changePosition, changeQueue } = actions;

export const Card = ({item, index}: CardProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isActive, setIsActive] = useState<boolean>(false);

  const isPlaying = useAppSelector(getIsPlaying);
  const currentTrack = useAppSelector(getCurrentTrack);
  const queue = useAppSelector(getQueue);
  const searchData = useAppSelector(getSearchData);
  const isCurrentTrack = currentTrack?.id === item.id;

  const playClickHandler = () => {
    if (isCurrentTrack && !isPlaying) {
      dispatch(changeIsPlaying(true));
      setIsActive(true);
    } else if (isCurrentTrack) {
      dispatch(changeIsPlaying(false));
      setIsActive(false);
    } else {
      if (searchData !== queue) {
        dispatch(changeQueue(searchData));
      };

      dispatch(changeCurrentTrack(item));
      dispatch(changeIsPlaying(true));
      dispatch(changePosition(index));
      setIsActive(true);
    };
  };

  useEffect(() => {
    if (!isCurrentTrack) {
      setIsActive(false);
    } else if (isCurrentTrack && isPlaying) {
      setIsActive(true);
    };
  }, [isCurrentTrack, isPlaying]);

  return (
    <div
      className="
        w-[250px]
        flex flex-col
        bg-white/5 text-white
        rounded-lg
        p-4"
    >
      <div className="relative group/cover cursor-pointer h-[218px]" onClick={playClickHandler}>
        <img src={item.album.cover_medium}
          className={`rounded-md transition-all group-hover/cover:scale-95 ${isActive && "scale-95"}`} alt="cover"
        />
        <div className={`
            ${isActive && "shadow-inner"}
            group-hover/cover:shadow-inner
            rounded-md
            w-full h-full 
            absolute inset-0 
            duration-150`}
        >
          <div className={`
            ${!isActive && "opacity-0"}
            group-hover/cover:opacity-100
            transition-all ease-in
            absolute bottom-2 right-2`}
          >
            {
              isCurrentTrack && isPlaying
              ? <HiPause className="text-5xl" /> 
              : <HiPlay className="text-5xl" />
            }
          </div>
        </div>
      </div>
      <div className="flex mt-2 items-center">
        {item.explicit_lyrics && <BsFillExplicitFill className="mr-1 text-sm" />}
        <div className="track truncate hover:underline">
          <Link to={`${AppRoute.Album}/${item.album.id}`}>{item.title_short}</Link>
        </div>
      </div>
      <div className="truncate">
        <Link 
          className="text-white/60 hover:underline"
          to={`${AppRoute.Artist}/${item.artist.id}`}
        >
          {item.artist.name}
        </Link>
      </div>
    </div>
  );
};

type CardsProps = {
  data: TrackData[];
};

export const Cards = ({data}: CardsProps): JSX.Element => (
  <div className="flex flex-wrap pt-20 gap-4 pb-28 justify-center">
    {data.map((item, index) => (
      <Card key={item.id} item={item} index={index + 1} />
    ))}
  </div>
);
