import axios from 'axios';

const ROOT_URL = ``;

export const FETCH_SUMMONER = "FETCH_SUMMONER";

export function fetchSummoner(name) {
    const url = `${ROOT_URL}&q=${name}`
    const request = axios.get(url);

    return {
        type: FETCH_SUMMONER,
        payload: request
    }
}