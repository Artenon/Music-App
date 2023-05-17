import { useEffect, useState } from "react";
import { HiPause, HiPlay } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getCurrentTrack, getIsPlaying, getQueue } from "../../redux/track/selectors";
import actions from "../../redux/track/track-slice";
import { TrackData } from "../../types/music.types";

type FavoriteSongProps = {
  track: TrackData;
  index: number;
  queuePayload: TrackData[];
};

const { changeIsPlaying, changeCurrentTrack, changePosition, changeQueue } = actions;

export const Song = ({track, index, queuePayload}: FavoriteSongProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isActive, setIsActive] = useState<boolean>(false);

  const currentTrack = useAppSelector(getCurrentTrack);
  const isPlaying = useAppSelector(getIsPlaying);
  const queue = useAppSelector(getQueue);
  const isCurrentTrack = currentTrack?.id === track.id;

  const handleClick = () => {
    if (isCurrentTrack && !isPlaying) {
      dispatch(changeIsPlaying(true));
      setIsActive(true);  
    } else if (isCurrentTrack) {
      dispatch(changeIsPlaying(false));
      setIsActive(false);
    } else {
      if (queuePayload !== queue) {
        dispatch(changeQueue(queuePayload));
      };

      dispatch(changeCurrentTrack({ ...track }));
      dispatch(changeIsPlaying(true));
      dispatch(changePosition(index));
      setIsActive(true);
    }
  };

  useEffect(() => {
    if (!isCurrentTrack) {
      setIsActive(false);
    } else if (isCurrentTrack && isPlaying) {
      setIsActive(true);
    };
  }, [isCurrentTrack, isPlaying]);

  return (
    <div className="flex py-1 text-white">
      <div className={`
        flex group/song 
        hover:bg-white hover:text-black hover:font-bold hover:shadow-lg hover:pl-2
        transition-all cursor-pointer pr-2 p-1 rounded-lg
        ${isActive && "bg-white text-black font-bold shadow-lg pl-2"}`}
        onClick={handleClick}
      >
        <div className={`group-hover/song:scale-150 w-[20px] flex justify-end items-center ${isActive && "scale-150"}`}>
          <div className={`group-hover/song:hidden ${isActive && "hidden"}`}>{index}</div>
          <div className={`${isActive ? "block text-black" : "hidden"} group-hover/song:block`}>
            {
              isCurrentTrack && isPlaying
                ? <HiPause />
                : <HiPlay />
            }
          </div>
        </div>
        <div className="flex ml-4 items-center">
          <img className={`w-[56px] h-[56px] mr-2 rounded-md transition-all group-hover/song:shadow-cover ${isActive && "shadow-cover"}`} src={track.album.cover_small} alt="cover" />
          <div>
            <p className="text-lg">{track.title}</p>
            <p className={`${isActive ? "text-black/60" : "text-gray-300/60"} group-hover/song:text-black/60`}>
              {track.artist.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};