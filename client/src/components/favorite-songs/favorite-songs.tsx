import { useAppSelector } from "../../hooks/hooks";
import { getFavorites } from "../../redux/user/selectors";
import { Song } from "../song/song";

export const FavoriteSongs = (): JSX.Element => {
  const favorites = useAppSelector(getFavorites);

  if (favorites.tracks.length === 0) {
    return (
      <div className="text-white text-xl">Search and add your first song to favorites</div>
    );
  };
  
  return (
    <div>
      {
        favorites.tracks.map((track, index) => (
          <Song key={track.id} track={track} index={index + 1} queuePayload={favorites.tracks} />
        ))
      }
    </div>
  );
};
