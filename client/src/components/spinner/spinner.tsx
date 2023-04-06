import { Bars } from "react-loader-spinner";

export const Spinner = (): JSX.Element => {
  return (
    <div className="spinner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spinner">
      <Bars
        height="100"
        width="100"
        color="#fff"
      />
    </div>
  );
};
