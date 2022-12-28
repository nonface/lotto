import axios from "axios";
import { useQuery } from "react-query";
import { Games } from "../types";

interface UseFetchResultsOptions {
  limit: number;
  game: string;
}

interface QueryOptions {
  limit: number;
  game: string;
}

type WinningNumbers = {
  IsSpecial: boolean;
  Name: string | null;
  Number: string;
};

interface PreviousDraws {
  DrawDate: string;
  DrawNumber: number;
  WinningNumbers: { [key: string]: WinningNumbers };
}

const fetchResults = async ({ limit, game }: QueryOptions) => {
  const gameIds = {
    powerball: "12",
    mega_millions: "15",
    superlotto_plus: "8",
  } as { [key in Games as string]: string };

  const baseUrl = `https://www.calottery.com/api/DrawGameApi/DrawGamePastDrawResults/${gameIds[game]}`;

  if (limit > 50) {
    const pages = Math.ceil(limit / 50);
    let urls = [];

    for (let i = 1; i <= pages; i++) {
      urls.push(`${baseUrl}/${i}/50`);
    }

    const queries = await axios.all(urls.map((url) => axios.get(url)));

    return queries.reduce<PreviousDraws[]>((array, query) => {
      return [...array, ...query.data.PreviousDraws];
    }, []);
  }

  const { data } = await axios.get(`${baseUrl}/1/${limit}`);

  return data.PreviousDraws;
};

export const useFetchResults = ({ limit, game }: UseFetchResultsOptions) => {
  const url = `https://www.calottery.com/api/DrawGameApi/DrawGamePastDrawResults`;

  return useQuery([url, limit, game], () => fetchResults({ limit, game }), {
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
