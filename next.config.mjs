/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "s4.anilist.co",
            },
            {
                hostname: "img1.ak.crunchyroll.com"
            },
            {
                hostname: "i.ytimg.com"
            }
        ],
    }
};

export default nextConfig;
