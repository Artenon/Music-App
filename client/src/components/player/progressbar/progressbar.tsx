import { useEffect, MutableRefObject, useRef } from "react";
import "./progressbar.css";

type ProgressBarProps = {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
};

export const ProgressBar = ({audioRef}: ProgressBarProps): JSX.Element => {
  const progressRef = useRef<HTMLInputElement>(null);

  const handleProgressChange = () => {
    if (audioRef.current && progressRef.current) {
      audioRef.current.currentTime = audioRef.current.duration * Number(progressRef.current.value) / 100;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const progress = progressRef.current;

    const handleTimeUpdate = () => {
      if (progress && audio) {
        if (audio.duration > 0) {
          progress.value = String(audio.currentTime / audio.duration * 100);
        } else {
          progress.value = String(0);
        }
        progress.style.setProperty(
          '--range-progress',
          `${progressRef.current.value}%`
        )
      };
    };

    if (audio && progress) {
      audio.addEventListener('timeupdate', handleTimeUpdate);  
    };

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [audioRef]);

  return (
    <input
      className="absolute"
      ref={progressRef}
      type="range"
      name="range"
      defaultValue={0}
      onChange={handleProgressChange}
    />
  );
};