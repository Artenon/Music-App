import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { HiPlay, HiPause } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getIsPlaying, getPosition, getQueue } from "../../redux/track/selectors";
import actions from "../../redux/track/track-slice";

const { changeIsPlaying, changeCurrentTrack, changePosition } = actions;

export const PlayButtons = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isPlaying = useAppSelector(getIsPlaying);
  const position = useAppSelector(getPosition);
  const queue = useAppSelector(getQueue);
  
  const playHandler = () => {
    dispatch(changeIsPlaying(!isPlaying));
  };

  const prevHandler = () => {
    if (position === 1) {
      dispatch(changePosition(queue.length));
      dispatch(changeCurrentTrack(queue[queue.length - 1]));
    } else {
      dispatch(changePosition(position - 1));
      dispatch(changeCurrentTrack(queue[position - 2]));
    };

    dispatch(changeIsPlaying(true));
  };

  const nextHandler = () => {
    if (position === queue.length) {
      dispatch(changePosition(1));
      dispatch(changeCurrentTrack(queue[0]));
    } else {
      dispatch(changePosition(position + 1));
      dispatch(changeCurrentTrack(queue[position]));
    };

    dispatch(changeIsPlaying(true));
  };

  return (
    <div className="control-buttons flex items-center w-[148px] pr-4">
      <GiPreviousButton 
        className="text-4xl cursor-pointer hover:scale-110 active:scale-100 transition-all"
        onClick={prevHandler}
      />
      <div className="play-btn cursor-pointer hover:scale-110 active:scale-100 transition-all" onClick={playHandler}>
        { isPlaying ? <HiPause className="text-6xl" /> : <HiPlay className="text-6xl" /> }
      </div>
      <GiNextButton 
        className="text-4xl cursor-pointer hover:scale-110 active:scale-100 transition-all"
        onClick={nextHandler}
      />
    </div>
  );
}
