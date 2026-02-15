import { AiFillLike } from "react-icons/ai";

const AnimeReviews = ({ reviews }) => {
    if (!reviews?.nodes?.length) {
        return <p className="text-zinc-500 italic">No reviews yet.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.nodes.map((review) => (
                <div key={review.id} className="bg-zinc-50 dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <img
                            src={review.user?.avatar?.large}
                            alt="avatar"
                            className="w-10 h-10 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
                        />
                        <div className="flex justify-between w-full">
                            <p className="font-bold text-sm text-zinc-900 dark:text-white">{review.user?.name}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-full">
                                <AiFillLike className="text-green-500" />
                                <span>{review.rating}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-4 leading-relaxed italic">
                        "{review.summary}"
                    </p>
                </div>
            ))}
        </div>
    );
};

export default AnimeReviews;
