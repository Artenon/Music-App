import { useRef, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getCurrentTrack, getIsPlaying, getIsAutoPlay, getFrom, getPosition } from "../../redux/track/selectors";
import { getAlbumData, getSearchData } from "../../redux/data/selectors";
import { getFavorites } from "../../redux/auth/selectors";
import { ProgressBar } from "./progressbar/progressbar";
import { PlayButtons } from "./play-buttons";
import { UserButtons } from "./user-buttons";
import { TrackInfo } from "./track-info";
import { From } from "../../const";
import actions from "../../redux/track/track-slice";

const { changeIsPlaying, changeCurrentTrack, changePosition } = actions;

export const Player = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isShowing, setIsShowing] = useState<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = useAppSelector(getCurrentTrack);
  const isPlaying = useAppSelector(getIsPlaying);
  const isAutoPlay = useAppSelector(getIsAutoPlay);
  const from = useAppSelector(getFrom);
  const position = useAppSelector(getPosition);
  const searchData = useAppSelector(getSearchData);
  const albumData = useAppSelector(getAlbumData);
  const favorites = useAppSelector(getFavorites);

  useEffect(() => {
    const audio = audioRef.current;
    const endedHandler = () => {
      if (isAutoPlay) {
        if (from === From.Search) {

          if (position === searchData.length) {
            dispatch(changePosition(1));
            dispatch(changeCurrentTrack(searchData[0]));
          } else {
            dispatch(changePosition(position + 1));
            dispatch(changeCurrentTrack(searchData[position]));
          };
          
        } else if (from === From.Album) {
          
          if (position === albumData?.tracks.length) {
            dispatch(changePosition(1));
            dispatch(changeCurrentTrack(albumData?.tracks[0]));
          } else {
            dispatch(changePosition(position + 1));
            dispatch(changeCurrentTrack(albumData?.tracks[position]));
          };
          
        } else if (from === From.Favorites) {

          if (position === favorites.length) {
            dispatch(changePosition(1));
            dispatch(changeCurrentTrack(favorites[0]));
          } else {
            dispatch(changePosition(position + 1));
            dispatch(changeCurrentTrack(favorites[position]));
          };

        };
        dispatch(changeIsPlaying(true));
      } else {
        dispatch(changeIsPlaying(false));
      };
    };

    if (audio) {
      audio.addEventListener('ended', endedHandler);
    };

    return () => {
      if (audio) {
        audio.removeEventListener('ended', endedHandler);
      };
    };
  }, [albumData?.tracks, dispatch, favorites, from, isAutoPlay, position, searchData]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
        setIsShowing(true);
      } else {
        audio.pause();
      };
    };
  }, [isPlaying]);

  return (
    <div className={`
      audio-player transition-all duration-300
      fixed z-10
      h-20 left-1/2 -translate-x-1/2 bg-black/20
      backdrop-blur-xl text-white shadow-extra rounded-xl
      flex items-center px-4
      ${isShowing ? "bottom-4" : "-bottom-24 invisible"}`}
    >
      <audio
        ref={audioRef}
        className={`${currentTrack === null && "hidden"}`}
        src={currentTrack?.preview}
        autoPlay
      />
      <PlayButtons />
      <TrackInfo />
      <UserButtons />
      <ProgressBar audioRef={audioRef} />
    </div>
  );
};
