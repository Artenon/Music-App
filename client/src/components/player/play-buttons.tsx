import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { HiPlay, HiPause } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getIsPlaying } from "../../redux/track/selectors";
import actions from "../../redux/track/track-slice";

const { changeIsPlaying } = actions;

export const PlayButtons = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(getIsPlaying);
  
  const playHandler = () => {
    dispatch(changeIsPlaying(!isPlaying));
  };

  return (
    <div className="control-buttons flex items-center w-[148px] pr-4">
      <GiPreviousButton className="text-4xl cursor-pointer hover:scale-110 active:scale-100 transition-all" />
      <div className="play-btn cursor-pointer hover:scale-110 active:scale-100 transition-all" onClick={playHandler}>
        { isPlaying ? <HiPause className="text-6xl" /> : <HiPlay className="text-6xl" /> }
      </div>
      <GiNextButton className="text-4xl cursor-pointer hover:scale-110 active:scale-100 transition-all" />
    </div>
  );
}
