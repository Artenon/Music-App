import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getArtist } from "../../redux/data/api-actions";
import { getArtistData, getIsLoading } from "../../redux/data/selectors";
import { Spinner } from "../../components/spinner/spinner";

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
      <div className="flex items-center">
        <img src={artistData.artist?.picture_big} className="rounded-xl w-[400px] h-[400px]" alt="artist" />
        <div className="ml-8 flex flex-col">
          <div className="text-6xl font-bold">{artistData.artist?.name}</div>
          <div>Fans: {artistData.artist?.nb_fan}</div>
        </div>
      </div>
    </div>
  );
};
