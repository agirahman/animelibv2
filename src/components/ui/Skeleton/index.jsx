const Skeleton = ({ className }) => {
    return (
        <div
            className={`animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800 ${className}`}
        />
    );
};

export default Skeleton;
