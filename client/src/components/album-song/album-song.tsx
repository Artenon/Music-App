import { useState, useEffect } from "react";
import { HiPlay, HiPause } from "react-icons/hi";
import { Track, AlbumData } from "../../types/album.types";
import { getCurrentTrack, getIsPlaying } from "../../redux/track/selectors";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import actions from "../../redux/track/track-slice";
import { From } from "../../const";

const { changeCurrentTrack, changeIsPlaying, changeFrom, changePosition } = actions;

type AlbumSongProps = {
  track: Track;
  index: number;
  album: AlbumData;
}

export const AlbumSong = ({track, index, album}: AlbumSongProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isActive, setIsActive] = useState<boolean>(false);

  const isPlaying = useAppSelector(getIsPlaying);
  const currentTrack = useAppSelector(getCurrentTrack);
  const isCurrentTrack = currentTrack?.id === track.id;

  const handleClick = () => {
    if (isCurrentTrack && !isPlaying) {
      dispatch(changeIsPlaying(true));
      setIsActive(true);  
    } else if (isCurrentTrack) {
      dispatch(changeIsPlaying(false));
      setIsActive(false);
    } else {
      dispatch(changeCurrentTrack({
        ...track,
        artist: album.artist,
        album: {
          id: album.id,
          title: album.title,
          cover_small: album.cover_small,
          cover_medium: album.cover_medium
        }
      }));
      dispatch(changeIsPlaying(true));
      dispatch(changeFrom(From.Album));
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
    <div className="flex py-1">
      <div className={`
        flex group/song 
        hover:bg-white hover:text-black hover:font-bold hover:shadow-lg hover:pl-1
        transition-all cursor-pointer pr-2 rounded-lg
        ${isActive && "bg-white text-black font-bold shadow-lg pl-1"}`}
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
        <div className="ml-4">
          <p>{track.title}</p>
          <p className={`${isActive ? "text-black/60" : "text-gray-300/60"} group-hover/song:text-black/60`}>{album.artist.name}</p>
        </div>
      </div>
    </div>
  );
};
