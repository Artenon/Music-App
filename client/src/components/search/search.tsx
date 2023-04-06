import { useState, ChangeEvent, FormEvent } from "react";
import { GrSearch } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getSearchData } from "../../redux/data/selectors";
import { searchAction } from "../../redux/data/api-actions";

export const Search = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState<string>('');
  const [isFulfilled, setIsFulfilled] = useState<boolean>(false);

  const searchData = useAppSelector(getSearchData);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchAction(query));
    setIsFulfilled(true);
  };

  return (
    <form className={
        `w-7/12
        fixed
        transition-all
        duration-300
        z-10
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        ${(isFulfilled || searchData.length > 0) && 'top-4 translate-y-0 w-6/12 scale-90'}`
      }
      onSubmit={submitHandler}
    >
      <input
        className="
          shadow-xl
          rounded-full
          w-full h-10
          p-6 pr-12
          text-xl
          focus:outline-none focus:ring-4
          ring-gray-300
          transition-all duration-200"
        type="text" 
        placeholder="Search..."
        onChange={searchHandler}
        value={query}
      />
      <button 
        type="submit"
        className="
          absolute
          top-1/2 -right-3
          -translate-x-1/2 -translate-y-1/2
          transition-all
          hover:bg-gray-300
          active:scale-90
          rounded-full
          p-2
          h-10"
      >
        <GrSearch className="text-xl"/>
      </button>
    </form>
  );
};
