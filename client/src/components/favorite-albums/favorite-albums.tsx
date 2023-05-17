import { Link } from "react-router-dom";
import { HiArrowCircleRight } from "react-icons/hi";
import { BsFillExplicitFill } from "react-icons/bs";
import { useAppSelector } from "../../hooks/hooks";
import { getFavorites } from "../../redux/user/selectors";
import { AlbumData } from "../../types/music.types";
import { AppRoute } from "../../const";

type FavoriteAlbumProps = {
  item: AlbumData;
};

const FavoriteAlbum = ({item}: FavoriteAlbumProps): JSX.Element => {
  return (
    <div
      className="
        w-[250px]
        flex flex-col
        bg-white/5 text-white
        rounded-lg p-4"
    >
      <Link to={`${AppRoute.Album}/${item.id}`} className="relative group/cover cursor-pointer h-[218px]">
        <img
          src={item.cover_medium}
          className={`rounded-md transition-all group-hover/cover:scale-95`} alt="cover"
        />
        <div className={`
          rounded-md group-hover/cover:shadow-inner
          w-full h-full
          absolute inset-0
          transition-all`}
        >
          <div
            className={`
              group-hover/cover:opacity-100 opacity-0
              transition-all ease-in
              absolute bottom-2 right-2`}
          >
            <HiArrowCircleRight className="text-5xl" />
          </div>
        </div>
      </Link>
      <div className="flex mt-2 items-center">
        {item.explicit_lyrics && <BsFillExplicitFill className="mr-1 text-sm" />}
        <div className="track truncate hover:underline">
          <Link to={`${AppRoute.Album}/${item.id}`}>{item.title}</Link>
        </div>
      </div>
      <div className="truncate">
        <Link
          to={`${AppRoute.Artist}/${item.artist.id}`} 
          className="text-white/60 hover:underline"
        >
          {item.artist.name}
        </Link>
      </div>
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