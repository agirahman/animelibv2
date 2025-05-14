import { TbError404Off } from "react-icons/tb";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen pb-45">
      <div className="flex flex-col justify-center items-center text-gray-300 text-9xl">
        <TbError404Off />
        <h1 className="text-4xl font-medium">Not Found</h1>
      </div>
    </div>
  );
};

export default PageNotFound;
