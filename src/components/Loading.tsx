import { Spinner } from "./ui/spinner";

const Loading = () => {
  return (
    <div className="w-full min-h-screen grid place-items-center">
      <Spinner />
    </div>
  );
};

export default Loading;
