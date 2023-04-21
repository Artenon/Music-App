import { AiFillHeart } from "react-icons/ai";
import { useAppSelector } from "../../hooks/hooks";
import { getFavorites, getUsername } from "../../redux/auth/selectors";
import { FavoriteSong } from "../../components/favorite-song/favorite-song";

export const FavoritesPage = (): JSX.Element => {
  const favorites = useAppSelector(getFavorites);
  const username = useAppSelector(getUsername);

  return (
    <div className="p-8 pb-24">
      <div className="text-white font-bold text-6xl flex items-center mb-8">
        <div className="w-[400px] h-[400px] backdrop-blur-lg bg-rose-900/70 rounded-xl shadow-extra flex items-center justify-center">
          <AiFillHeart className="text-rose-600 animate-heart text-9xl" />
        </div>
        <div className="ml-8">
          <p>My Favorites</p>
          <p className="text-lg pt-4">
            By {username}
            <span className="text-white mx-1">&#183;</span>
            {
              favorites.length > 1
              ? `${favorites.length} songs`
              : "1 song"
            }
          </p>
        </div>
      </div>
      {
        favorites.map((item, index) => (
          <FavoriteSong key={item.id} track={item} index={index + 1} />
        ))
      }
    </div>
  );
};
