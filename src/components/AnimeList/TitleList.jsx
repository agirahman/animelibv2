import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const TitleList = ({ link, title }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-lg sm:text-xl font-semibold">{title}</h1>
      <Link href={link} className="flex items-center gap-1 h-7">
        <h1  className="text-sm md:text-md ">
          view all
        </h1>
        <HiOutlineArrowLongRight />
      </Link>
    </div>
  );
};

export default TitleList;
