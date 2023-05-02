import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { HiPlay, HiPause } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getIsPlaying, getFrom, getPosition, getAlbumPosition } from "../../redux/track/selectors";
import { getFavorites } from "../../redux/user/selectors";
import { getSearchData, getAlbumData } from "../../redux/data/selectors";
import actions from "../../redux/track/track-slice";
import { From } from "../../const";

const { changeIsPlaying, changeCurrentTrack, changePosition, changeAutoPlay, changeAlbumPosition } = actions;

export const PlayButtons = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isPlaying = useAppSelector(getIsPlaying);
  const from = useAppSelector(getFrom);
  const position = useAppSelector(getPosition);
  const albumPosition = useAppSelector(getAlbumPosition);
  const searchData = useAppSelector(getSearchData);
  const albumData = useAppSelector(getAlbumData);
  const favorites = useAppSelector(getFavorites);
  
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
      
    } else if (from === From.FavoriteTracks) {

      if (favorites.tracks.length <= 1) {
        dispatch(changeAutoPlay(false));
      } else if (position === 1) {
        dispatch(changePosition(favorites.tracks.length));
        dispatch(changeCurrentTrack(favorites.tracks[favorites.tracks.length - 1]));
      } else {
        dispatch(changePosition(position - 1));
        dispatch(changeCurrentTrack(favorites.tracks[position - 2]));
      };

    } else if (from === From.FavoriteAlbums) {
      
      if (albumPosition === 1 && position === 1) {
        const albumsLength = favorites.albums.length;
        const lastAlbumTracksLength = favorites.albums[albumsLength - 1].tracks.length;
        dispatch(changeAlbumPosition(albumsLength));
        dispatch(changePosition(lastAlbumTracksLength));
        dispatch(changeCurrentTrack(favorites.albums[albumsLength - 1].tracks[lastAlbumTracksLength - 1]));
      } else if (position === 1) {
        const prevTracksLength = favorites.albums[albumPosition - 2].tracks.length;
        dispatch(changeAlbumPosition(albumPosition - 1));
        dispatch(changePosition(prevTracksLength));
        dispatch(changeCurrentTrack(favorites.albums[albumPosition - 2].tracks[prevTracksLength - 1]));
      } else {
        dispatch(changePosition(position - 1));
        dispatch(changeCurrentTrack(favorites.albums[albumPosition - 1].tracks[position - 2]));
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
        dispatch(changePosition(1));
        dispatch(changeCurrentTrack(albumData?.tracks[0]));
      } else {
        dispatch(changePosition(position + 1));
        dispatch(changeCurrentTrack(albumData?.tracks[position]));
      };
      
    } else if (from === From.FavoriteTracks) {

      if (favorites.tracks.length <= 1) {
        dispatch(changeAutoPlay(false));
      } else if (position === favorites.tracks.length) {
        dispatch(changePosition(1));
        dispatch(changeCurrentTrack(favorites.tracks[0]));
      } else {
        dispatch(changePosition(position + 1));
        dispatch(changeCurrentTrack(favorites.tracks[position]));
      };

    } else if (from === From.FavoriteAlbums) {
      const albumsLength = favorites.albums.length;
      
      if (albumPosition === albumsLength && position === favorites.albums[albumsLength - 1].tracks.length) {
        dispatch(changeAlbumPosition(1));
        dispatch(changePosition(1));
        dispatch(changeCurrentTrack(favorites.albums[0].tracks[0]));
      } else if (position === favorites.albums[albumPosition - 1].tracks.length) {
        dispatch(changeAlbumPosition(albumPosition + 1));
        dispatch(changePosition(1));
        dispatch(changeCurrentTrack(favorites.albums[albumPosition].tracks[0]));
      } else {
        dispatch(changePosition(position + 1));
        dispatch(changeCurrentTrack(favorites.albums[albumPosition - 1].tracks[position]));
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
