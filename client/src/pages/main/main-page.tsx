import { useAppSelector } from "../../hooks/hooks";
import { getIsLoading, getSearchData } from "../../redux/data/selectors";
import { Search } from "../../components/search/search";
import { Cards } from "../../components/cards/cards";
import { Spinner } from "../../components/spinner/spinner";
import { Account } from "../../components/account/account";
import { Theme } from "../../components/theme/theme";

export const MainPage = (): JSX.Element => {
  const searchData = useAppSelector(getSearchData);
  const isLoading = useAppSelector(getIsLoading);

  return (
    <div className="h-screen">
      <div className="container m-auto">
        <Search />
        <Account />
        {
          isLoading
          ? <Spinner />
          : <Cards data={searchData} />
        }
        <Theme />
      </div>
    </div>
  );
};
