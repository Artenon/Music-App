import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getAlbumData, getIsLoading } from "../../redux/data/selectors";
import { getAlbum } from "../../redux/data/api-actions";
import { Spinner } from "../../components/spinner/spinner";
import { AlbumSong } from "../../components/album-song/album-song";

export const AlbumPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { albumID } = useParams();
  
  const isLoading = useAppSelector(getIsLoading);
  const albumData = useAppSelector(getAlbumData);

  useEffect(() => {
    if (albumID) {
      dispatch(getAlbum(albumID));
    };
  }, [dispatch, albumID]);

  if (isLoading || !albumData) {
    return <Spinner />;
  }
  
  /* albumData.genres.data */

  const date = new Date(Date.parse(albumData.release_date)).toLocaleString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col text-white p-8 pb-24">
      <div className="flex items-end mb-8">
        <img src={albumData.cover_big} className="w-[400px] h-[400px] rounded-xl shadow-player" alt="cover" />
        <div className="flex flex-col text-xl font-bold ml-8">
          <p className="uppercase">{albumData.record_type}</p>
          <p className="text-6xl my-4">{albumData.title}</p>
          <div className="flex items-center">
            <img src={albumData.artist.picture_small} className="rounded-full w-[56px] h-[56px]" alt="artist_cover" />
            <p className="ml-2">
              {albumData.artist.name}
              <span className="text-white mx-1">&#183;</span>
              {albumData.release_date.split('-')[0]}
            </p>
          </div>
        </div>
      </div>

      {
        albumData.tracks.map((track, index) => {
          return (
            <AlbumSong key={track.id} track={track} index={index + 1} album={albumData} />
          );
        })
      }

      <div className="pt-4 text-gray-200/60">{date}</div>
    </div>
  );
};
