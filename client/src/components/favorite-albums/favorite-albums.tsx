import { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillExplicitFill } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getFavorites } from "../../redux/user/selectors";
import { AlbumData } from "../../types/album.types";
import { AppRoute } from "../../const";

type FavoriteAlbumProps = {
  item: AlbumData;
};

const FavoriteAlbum = ({item}: FavoriteAlbumProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className="
        w-[250px]
        flex flex-col
        bg-white/5 text-white
        rounded-lg
        p-4"
    >
      <div className="relative group/cover cursor-pointer h-[218px]">
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
        favorites.albums.map((item) => (
          <FavoriteAlbum key={item.id} item={item} />
        ))
      }
    </div>
  );
};