"use server";

import { getAllAnimeOngoing } from "../libs/getAllAnimeOngoing";
import { getAllAnimePopular } from "../libs/getAllAnimePopular";
import { getAllAnimeUpcoming } from "../libs/getAllAnimeUpcoming";
import { getAnimeSearch } from "../libs/getAnimeSearch";

export const fetchOngoingAction = async (page) => {
    return await getAllAnimeOngoing(page);
};

export const fetchPopularAction = async (page) => {
    return await getAllAnimePopular(page);
};

export const fetchUpcomingAction = async (page) => {
    return await getAllAnimeUpcoming(page);
};

export const fetchSearchAction = async (keyword, page) => {
    return await getAnimeSearch(keyword, page);
};
