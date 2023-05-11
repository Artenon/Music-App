import { AiFillHeart } from "react-icons/ai";
import { BsFillHeartbreakFill } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getFavorites, getUsername } from "../../redux/user/selectors";
import { FavoriteSongs } from "../../components/favorite-songs/favorite-songs";
import { FavoriteAlbums } from "../../components/favorite-albums/favorite-albums";
import { getTab } from "../../redux/track/selectors";
import { TabsFavorites } from "../../const";
import actions from "../../redux/track/track-slice";

const { changeTab } = actions;

export const FavoritesPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(getFavorites);
  const username = useAppSelector(getUsername);
  const tab = useAppSelector(getTab);

  const tracksLength: string = (
    favorites.tracks.length === 0
    ? "0 tracks"
    : favorites.tracks.length === 1
      ? "1 song"
      : `${favorites.tracks.length} songs`
  );

  const albumsLength: string = (
    favorites.albums.length === 0
    ? "0 albums"
    : favorites.albums.length === 1
      ? "1 album"
      : `${favorites.albums.length} albums`
  );

  return (
    <div className="p-8 pb-28">
      <div className="text-white font-bold text-6xl flex items-center mb-6">
        <div className={`
          w-[400px] h-[400px] rounded-xl shadow-extra
          flex items-center justify-center transition-all
          ${favorites.tracks.length === 0 ? "bg-gray-800" : "bg-rose-900"}`}
        >
          {
            favorites.tracks.length === 0
            ? <BsFillHeartbreakFill className="text-gray-600 text-9xl" />
            : <AiFillHeart className="text-rose-600 animate-heart text-9xl" />
          }
        </div>
        <div className="ml-8">
          <p>My Favorites</p>
          <div className="flex text-lg pt-4">
            By {username}
            <span className="text-white mx-1">&#183;</span>
            {
              favorites.albums.length === 0 && favorites.tracks.length === 0
              ? "Nothing"
              : 
              <div>
                { tracksLength }
                <span className="text-white mx-1">&#183;</span>
                { albumsLength }
              </div>
            }
          </div>
        </div>
      </div>
      <div className="flex gap-2 mb-4 text-white font-bold text-xl">
        <div className={`
          p-2 rounded-lg cursor-pointer transition-all 
          hover:text-black hover:bg-white
          ${tab === TabsFavorites.Songs && "text-black bg-white"}
          `}
          onClick={() => dispatch(changeTab(TabsFavorites.Songs))}
        >
          {TabsFavorites.Songs}
        </div>
        <div className={`
          p-2 rounded-lg cursor-pointer transition-all 
          hover:text-black hover:bg-white
          ${tab === TabsFavorites.Albums && "text-black bg-white"}
          `}
          onClick={() => dispatch(changeTab(TabsFavorites.Albums))}
        >
          {TabsFavorites.Albums}
        </div>
      </div>
      {
        tab === TabsFavorites.Songs
        ? <FavoriteSongs />
        : <FavoriteAlbums />
      }
    </div>
  );
};
