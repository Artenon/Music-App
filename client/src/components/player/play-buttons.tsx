import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { HiPlay, HiPause } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getIsPlaying, getFrom, getPosition } from "../../redux/track/selectors";
import { getSearchData, getAlbumData } from "../../redux/data/selectors";
import actions from "../../redux/track/track-slice";
import { From } from "../../const";

const { changeIsPlaying, changeCurrentTrack, changePosition } = actions;

export const PlayButtons = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isPlaying = useAppSelector(getIsPlaying);
  const from = useAppSelector(getFrom);
  const position = useAppSelector(getPosition);
  const searchData = useAppSelector(getSearchData);
  const albumData = useAppSelector(getAlbumData);
  
  const playHandler = () => {
    dispatch(changeIsPlaying(!isPlaying));
  };

  const prevHandler = () => {
    if (from === From.Search) {

      if (position === 1) {
        dispatch(changePosition(searchData.length));
        dispatch(changeCurrentTrack(searchData[searchData.length - 1]));
      } else {
        dispatch(changePosition(position - 1));
        dispatch(changeCurrentTrack(searchData[position - 2]));
      };
      
    } else if (from === From.Album) {
      
      if (position === 1) {
        dispatch(changePosition(albumData?.tracks.length));
        dispatch(changeCurrentTrack(albumData?.tracks[albumData.tracks.length - 1]));
      } else {
        dispatch(changePosition(position - 1));
        dispatch(changeCurrentTrack(albumData?.tracks[position - 2]));
      };
      
    };
    dispatch(changeIsPlaying(true));
  };

  const nextHandler = () => {
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
        dispatch(changePosition(0));
        dispatch(changeCurrentTrack(albumData?.tracks[0]));
      } else {
        dispatch(changePosition(position + 1));
        dispatch(changeCurrentTrack(albumData?.tracks[position]));
      };
      
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
