import { useAppSelector } from "../../hooks/hooks";
import { getIsLoading, getSearchData } from "../../redux/data/selectors";
import { Search } from "../../components/search/search";
import { Cards } from "../../components/cards/cards";
import { Spinner } from "../../components/spinner/spinner";

export const Main = (): JSX.Element => {
  const searchData = useAppSelector(getSearchData);
  const isLoading = useAppSelector(getIsLoading);

  /* const body = document.querySelector('body');
  body?.style.setProperty('--gradient', 'linear-gradient(rgb(17, 24, 39), rgb(75, 85, 99)) */

  return (
    <div className="h-screen">
      <div className="container m-auto">
        <Search />
        {
          isLoading
          ? <Spinner />
          : <Cards data={searchData} />
        }
      </div>
    </div>
  );
};
