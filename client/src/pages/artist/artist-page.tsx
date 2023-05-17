import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getArtist } from "../../redux/data/api-actions";
import { getArtistData, getIsLoading } from "../../redux/data/selectors";
import { Spinner } from "../../components/spinner/spinner";
import { Song } from "../../components/song/song";

export const ArtistPage = (): JSX.Element => {
  const { artistID } = useParams();
  const dispatch = useAppDispatch();

  const artistData = useAppSelector(getArtistData);
  const isLoading = useAppSelector(getIsLoading);

  useEffect(() => {
    if (artistID) {
      dispatch(getArtist(artistID));
    };
  }, [artistID, dispatch]);

  if (isLoading || !artistData) {
    return <Spinner />;
  };

  return (
    <div className="flex flex-col text-white p-8 pb-28">
      <div className="flex items-center mb-8">
        <img src={artistData.artist?.picture_big} className="rounded-xl w-[400px] h-[400px] shadow-extra" alt="artist" />
        <div className="flex flex-col ml-8 font-bold gap-4">
          <div className="text-6xl">{artistData.artist?.name}</div>
          <div className="flex text-xl">
            <div>{artistData.artist?.nb_fan?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} fans</div>
            <span className="text-white mx-1">&#183;</span>
            <div>{artistData.total} songs</div>
          </div>
        </div>
      </div>
      <div>
        {
          artistData.data.map((song, index) => (
            <Song key={song.id} track={song} index={index + 1} queuePayload={artistData.data} />
          ))
        }
      </div>
    </div>
  );
};
