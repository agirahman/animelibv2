"use client";

import Link from "next/link";
import { FaGithub, FaTwitter, FaDiscord, FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/"
                            className="text-3xl text-green-500 font-bold tracking-tighter hover:scale-105 transition-transform w-fit"
                        >
                            animelib.
                        </Link>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs">
                            Discover the world of anime with animelib. Your ultimate source for the latest, upcoming, and most popular titles.
                        </p>
                        <div className="flex gap-4 text-zinc-400 dark:text-zinc-500">
                            <a href="#" className="hover:text-green-500 transition-colors"><FaGithub size={20} /></a>
                            <a href="#" className="hover:text-green-500 transition-colors"><FaTwitter size={20} /></a>
                            <a href="#" className="hover:text-green-500 transition-colors"><FaDiscord size={20} /></a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-zinc-900 dark:text-white font-bold mb-6 tracking-tight">Navigation</h4>
                        <ul className="flex flex-col gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                            <li><Link href="/" className="hover:text-green-500 transition-colors">Home</Link></li>
                            <li><Link href="/ongoing" className="hover:text-green-500 transition-colors">Ongoing Anime</Link></li>
                            <li><Link href="/upcoming" className="hover:text-green-500 transition-colors">Upcoming Anime</Link></li>
                            <li><Link href="/popular" className="hover:text-green-500 transition-colors">Most Popular</Link></li>
                        </ul>
                    </div>

                    {/* Categories / Tags Placeholder */}
                    <div>
                        <h4 className="text-zinc-900 dark:text-white font-bold mb-6 tracking-tight">Quick Links</h4>
                        <ul className="flex flex-col gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                            <li><Link href="#" className="hover:text-green-500 transition-colors">Genres</Link></li>
                            <li><Link href="#" className="hover:text-green-500 transition-colors">Latest Episodes</Link></li>
                            <li><Link href="#" className="hover:text-green-500 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-green-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* API Credits */}
                    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                        <h4 className="text-zinc-900 dark:text-white font-bold tracking-tight">API Credits</h4>
                        <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
                            This application is powered by the <strong>Anilist GraphQL API</strong>. Special thanks to the Anilist team for their amazing work.
                        </p>
                        <a
                            href="https://anilist.co/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-bold text-green-500 hover:text-green-600 transition-colors"
                        >
                            Learn more about Anilist <FaExternalLinkAlt size={10} />
                        </a>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                    <p>© {new Date().getFullYear()} animelib. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
