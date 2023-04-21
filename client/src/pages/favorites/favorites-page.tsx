import { useAppSelector } from "../../hooks/hooks";
import { getFavorites } from "../../redux/auth/selectors";
import { FavoriteSong } from "../../components/favorite-song/favorite-song";

export const FavoritesPage = (): JSX.Element => {
  const favorites = useAppSelector(getFavorites);

  return (
    <div>
      {
        favorites.map((item, index) => (
          <FavoriteSong key={item.id} track={item} index={index + 1} />
        ))
      }
    </div>
  );
};
