import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiCopyright } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ColorRing } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getAlbumData, getIsLoading } from "../../redux/data/selectors";
import { getFavorites, getAuthStatus, getIsAddingFavAlbum } from "../../redux/user/selectors";
import { getAlbum } from "../../redux/data/api-actions";
import { addFavoriteAlbum, removeFavoriteAlbum } from "../../redux/user/api-actions";
import { Spinner } from "../../components/spinner/spinner";
import { AlbumSong } from "../../components/album-song/album-song";
import { AuthStatus } from "../../const";

export const AlbumPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { albumID } = useParams();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  
  const isLoading = useAppSelector(getIsLoading);
  const isAddingFavAlbum = useAppSelector(getIsAddingFavAlbum);
  const albumData = useAppSelector(getAlbumData);
  const favorites = useAppSelector(getFavorites);
  const authStatus = useAppSelector(getAuthStatus);

  const likeHandler = () => {
    if (albumData) {
      dispatch(addFavoriteAlbum(albumData));
    };
  };

  const unlikeHandler = () => {
    if (albumData) {
      dispatch(removeFavoriteAlbum(albumData.id));
    }
  };

  useEffect(() => {
    if (albumID) {
      dispatch(getAlbum(albumID));
    };
  }, [dispatch, albumID]);

  useEffect(() => {
    if (albumID) {
      if (favorites.albums.filter(item => item.id === Number(albumID)).length !== 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      };
    };
  }, [albumID, favorites.albums]);

  if (isLoading || !albumData) {
    return <Spinner />;
  };

  const date = new Date(Date.parse(albumData.release_date)).toLocaleString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col text-white p-8 pb-28">
      <div className="flex mb-8">
        <img src={albumData.cover_big} className="w-[400px] h-[400px] rounded-xl shadow-extra" alt="cover" />
        <div className="flex flex-col justify-end text-xl font-bold ml-8">
          <div className="uppercase">{albumData.record_type}</div>
          <div className="text-6xl my-4">{albumData.title}</div>
          <div className="flex items-center">
            <img src={albumData.artist.picture_small} className="rounded-full w-[56px] h-[56px]" alt="artist_cover" />
            <div className="ml-2 flex items-center">
              {albumData.artist.name}
              <span className="text-white mx-1">&#183;</span>
              {albumData.release_date.split('-')[0]}
              <span className="text-white mx-1">&#183;</span>
              <div className="flex gap-2">
                {albumData.genres.data.map(genre => (
                  <div key={genre.id} className="bg-white rounded-lg text-black p-1">{genre.name}</div>
                ))}
              </div>
              <span className="text-white mx-1">&#183;</span>
              <div className="cursor-pointer text-3xl">
                {
                  authStatus === AuthStatus.Authorized
                  ?
                    isAddingFavAlbum
                    ?
                      <ColorRing
                        visible={true}
                        height="30"
                        width="30"
                        colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                      />
                    : isLiked
                      ? <AiFillHeart onClick={unlikeHandler} className="text-rose-600 drop-shadow-heart animate-heartIn" />
                      : <AiOutlineHeart onClick={likeHandler} className="animate-heartOut" />
                  : null
                }
              </div>
            </div>
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

      <div className="pt-4 text-gray-200/60 flex flex-col">
        {date}
        <div className="flex items-center"><BiCopyright className="mr-1" />{albumData.label}</div>
      </div>
    </div>
  );
};
