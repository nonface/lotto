type Result = { [key: string]: number };

export type Games = "powerball" | "mega_millions" | "superlotto_plus";
export type GameLabels = 'Powerball' | 'Mega Millions' | 'SuperLotto Plus';

type WinningNumbers = {
  IsSpecial: boolean;
  Name: string | null;
  Number: string;
};

export interface PreviousDraws {
  DrawDate: string;
  DrawNumber: number;
  WinningNumbers: { [key: string]: WinningNumbers };
}

export interface Results {
  regular: Result;
  special: Result;
}

export interface SortedResults {
  regular: [string, number][];
  special: [string, number][];
}

export interface SavedState {
  regular: string[];
  special: string;
  tier: string;
  game: GameLabels;
  limit: number;
  dateAdded: string;
}

export interface OptionsState {
  game: Games;
  limit: number;
  randomize: number;
}

export interface SaveNumbersArgs extends SortedResults {
  tier: string;
  limit: number;
  game: GameLabels;
}
