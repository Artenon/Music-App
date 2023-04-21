import { useState } from "react";
import { HiPause, HiPlay } from "react-icons/hi";
import { SongData } from "../../types/song.types";
import { useAppSelector } from "../../hooks/hooks";
import { getCurrentTrack, getIsPlaying } from "../../redux/track/selectors";

type FavoriteSongProps = {
  track: SongData;
  index: number;
};

export const FavoriteSong = ({track, index}: FavoriteSongProps): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const currentTrack = useAppSelector(getCurrentTrack);
  const isPlaying = useAppSelector(getIsPlaying);
  const isCurrentTrack = currentTrack?.id === track.id;

  return (
    <div className="flex py-1 text-white">
      <div className={`
        flex group/song 
        hover:bg-white hover:text-black hover:font-bold hover:shadow-lg hover:pl-2
        transition-all cursor-pointer pr-2 p-1 rounded-lg
        ${isActive && "bg-white text-black font-bold shadow-lg pl-2"}`}
        /* onClick={handleClick} */
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
          <img className="w-[56px] h-[56px] mr-2 rounded-md" src={track.album.cover_small} alt="cover" />
          <div>
            <p>{track.title}</p>
            <p className={`${isActive ? "text-black/60" : "text-gray-300/60"} group-hover/song:text-black/60`}>
              {track.artist.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
