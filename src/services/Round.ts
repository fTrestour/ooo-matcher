export const rounds = [1, 2] as const;
export type Round = typeof rounds[number];

export const isRound = (round: any): round is Round => rounds.includes(round);
