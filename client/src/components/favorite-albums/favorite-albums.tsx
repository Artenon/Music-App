import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiPlay, HiPause } from "react-icons/hi";
import { BsFillExplicitFill } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getFavorites } from "../../redux/user/selectors";
import { getIsPlaying, getCurrentTrack } from "../../redux/track/selectors";
import { AlbumData } from "../../types/album.types";
import { AppRoute, From } from "../../const";
import actions from "../../redux/track/track-slice";
import albumActions from "../../redux/data/data-slice";

const { changeFrom, changeIsPlaying, changePosition, changeCurrentTrack, changeAlbumPosition } = actions;
const { addAlbumData } = albumActions;

type FavoriteAlbumProps = {
  item: AlbumData;
  position: number;
};

const FavoriteAlbum = ({item, position}: FavoriteAlbumProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isActive, setIsActive] = useState<boolean>(false);

  const isPlaying = useAppSelector(getIsPlaying);
  const currentTrack = useAppSelector(getCurrentTrack);

  const isCurrentAlbum = currentTrack?.album.id === item.id;

  const playClickHandler = () => {
    if (isCurrentAlbum && !isPlaying) {
      dispatch(changeIsPlaying(true));
      setIsActive(true);
    } else if (isCurrentAlbum) {
      dispatch(changeIsPlaying(false));
      setIsActive(false);
    } else {
      dispatch(changeIsPlaying(true));
      dispatch(changeFrom(From.FavoriteAlbums));
      dispatch(changeCurrentTrack(item.tracks[0]));
      dispatch(changePosition(1));
      dispatch(changeAlbumPosition(position));
      dispatch(addAlbumData(item));
      setIsActive(true);
    };
  };

  useEffect(() => {
    if (!isCurrentAlbum) {
      setIsActive(false);
    } else if (isCurrentAlbum && isPlaying) {
      setIsActive(true);
    }
  }, [isCurrentAlbum, isPlaying]);

  return (
    <div
      className="
        w-[250px]
        flex flex-col
        bg-white/5 text-white
        rounded-lg
        p-4"
    >
      <div className="relative group/cover cursor-pointer h-[218px]" onClick={playClickHandler}>
        <img src={item.cover_medium}
          className={`rounded-md transition-all group-hover/cover:scale-95 ${isActive && "scale-95"}`} alt="cover"
        />
        <div className={`
            ${isActive && "shadow-inner"}
            group-hover/cover:shadow-inner
            rounded-md
            w-full h-full 
            absolute inset-0 
            duration-150`}
        >
          <div className={`
            ${!isActive && "opacity-0"}
            group-hover/cover:opacity-100
            transition-all ease-in
            absolute bottom-2 right-2`}
          >
            {
              isCurrentAlbum && isPlaying
              ? <HiPause className="text-5xl" /> 
              : <HiPlay className="text-5xl" />
            }
          </div>
        </div>
      </div>
      <div className="flex mt-2 items-center">
        {item.explicit_lyrics && <BsFillExplicitFill className="mr-1 text-sm" />}
        <div className="track truncate hover:underline">
          <Link to={`${AppRoute.Album}/${item.id}`}>{item.title}</Link>
        </div>
      </div>
      <div className="artist text-white/60 truncate">{item.artist.name}</div>
    </div>
  );
};

export const FavoriteAlbums = (): JSX.Element => {
  const favorites = useAppSelector(getFavorites);

  if (favorites.albums.length === 0) {
    return (
      <div className="text-white text-xl">Search and add your first album to favorites</div>
    );
  };

  return (
    <div className="flex flex-wrap gap-4">
      {
        favorites.albums.map((item, index) => (
          <FavoriteAlbum key={item.id} item={item} position={index + 1} />
        ))
      }
    </div>
  );
};