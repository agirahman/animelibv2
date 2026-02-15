import Link from "next/link";

const TitleList = ({ link, title }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-lg sm:text-xl font-semibold">{title}</h1>
      <Link href={link} className="flex items-center gap-1 h-7">
        <h1  className="text-sm md:text-md hover:text-green-400 transition-all">
          view all
        </h1>
        
      </Link>
    </div>
  );
};

export default TitleList;
