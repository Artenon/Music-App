import { useRef, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getCurrentTrack, getIsPlaying } from "../../redux/track/selectors";
import actions from "../../redux/track/track-slice";
import { ProgressBar } from "./progressbar/progressbar";
import { PlayButtons } from "./play-buttons";
import { TrackInfo } from "./track-info";

const { changeIsPlaying } = actions;

export const Player = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isShowing, setIsShowing] = useState<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = useAppSelector(getCurrentTrack);
  const isPlaying = useAppSelector(getIsPlaying);

  useEffect(() => {
    const audio = audioRef.current;
    const endedHandler = () => {
      dispatch(changeIsPlaying(false));
    };

    if (audio) {
      if (isPlaying) {
        audio.play();
        setIsShowing(true);
      } else {
        audio.pause();
      };
      audio.addEventListener('ended', endedHandler);
    };

    return () => {
      if (audio) {
        audio.removeEventListener('ended', endedHandler);
      }
    };
  }, [dispatch, isPlaying]);

  return (
    <div className={`
      audio-player transition-all duration-300
      fixed z-10
      h-20 left-1/2 -translate-x-1/2 bg-black/20
      backdrop-blur-xl text-white shadow-player rounded-xl
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
      <ProgressBar audioRef={audioRef} />
    </div>
  );
};
