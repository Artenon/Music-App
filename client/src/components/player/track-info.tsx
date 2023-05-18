import { Link } from "react-router-dom";
import { BsFillExplicitFill } from "react-icons/bs";
import { useAppSelector } from "../../hooks/hooks";
import { getCurrentTrack } from "../../redux/track/selectors";
import { AppRoute } from "../../const";

export const TrackInfo = (): JSX.Element => {
  const currentTrack = useAppSelector(getCurrentTrack);

  return (
    <div className="track-info flex items-center max-w-[500px]">
      <div className="cover mr-1 w-[56px]">
        <img src={currentTrack?.album.cover_small} alt="cover" className="rounded-lg" />
      </div>
      <div className="flex flex-col mx-1 max-w-[432px]">
        <div className="flex items-center">
          {currentTrack?.explicit_lyrics && <BsFillExplicitFill className="mr-1 text-sm" />}
          <div className="track truncate hover:underline text-lg">
            <Link to={`${AppRoute.Album}/${currentTrack?.album.id}`}>{currentTrack?.title_short}</Link>
          </div>
        </div>
        <div className="additional_info text-white/60 truncate">
          <Link className="text-white/60 hover:text-white transition-all" to={`${AppRoute.Artist}/${currentTrack?.artist.id}`}>
            {currentTrack?.artist.name}
          </Link>
          <span className="text-white mx-1 cursor-default">&#183;</span>
          <Link className="text-white/60 hover:text-white transition-all" to={`${AppRoute.Album}/${currentTrack?.album.id}`}>
            {currentTrack?.album.title}
          </Link>
        </div>
      </div>
    </div>
  );
};
