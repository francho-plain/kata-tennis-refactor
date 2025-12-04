import { TennisGame } from './TennisGame';

const LOVE = 0;
const FIFTEEN = 1;
const THIRTY = 2;
const FORTY = 3;
const GAME = 4;

const WINNING_SCORE = 4;
const WIN_FOR_PLAYER1 = "Win for player1";
const WIN_FOR_PLAYER2 = "Win for player2";
const ADVANTAGE_PLAYER1 = "Advantage player1";
const ADVANTAGE_PLAYER2 = "Advantage player2";

const DEUCE = "Deuce";

// Score names
const LOVE_NAME = "Love";
const FIFTEEN_NAME = "Fifteen";
const THIRTY_NAME = "Thirty";
const FORTY_NAME = "Forty";

export class TennisGame5 implements TennisGame {
  private readonly player2Name: string;
  private readonly player1Name: string;
  private player1Score: number;
  private player2Score: number;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.player1Score = 0;
    this.player2Score = 0;
  }

  private buildScore(p1Score: number, p2Score: number): string {
    const scoreNames: { [key: number]: string } = {
      [LOVE]: LOVE_NAME,
      [FIFTEEN]: FIFTEEN_NAME,
      [THIRTY]: THIRTY_NAME,
      [FORTY]: FORTY_NAME
    };

    // eslint-disable-next-line security/detect-object-injection
    const p1ScoreName = scoreNames[p1Score];
    // eslint-disable-next-line security/detect-object-injection
    const p2ScoreName = scoreNames[p2Score];
    return `${p1ScoreName}-${(p1ScoreName === p2ScoreName ) ? 'All' : p2ScoreName}`;
  }

  getScore(): string {
    let p1 = this.player1Score;
    let p2 = this.player2Score;

    while (p1 > WINNING_SCORE || p2 > WINNING_SCORE) {
      p1--;
      p2--;
    }

    const lookup: { [key: number]: { [key: number]: string } } = {
      [LOVE]: {
        [LOVE]: this.buildScore(LOVE, LOVE),
        [FIFTEEN]: this.buildScore(LOVE, FIFTEEN),
        [THIRTY]: this.buildScore(LOVE, THIRTY),
        [FORTY]: this.buildScore(LOVE, FORTY),
        [GAME]: WIN_FOR_PLAYER2
      },

      [FIFTEEN]: {
        [LOVE]: this.buildScore(FIFTEEN, LOVE),
        [FIFTEEN]: this.buildScore(FIFTEEN, FIFTEEN),
        [THIRTY]: this.buildScore(FIFTEEN, THIRTY),
        [FORTY]: this.buildScore(FIFTEEN, FORTY),
        [GAME]: WIN_FOR_PLAYER2
      },

      [THIRTY]: {
        [LOVE]: this.buildScore(THIRTY, LOVE),
        [FIFTEEN]: this.buildScore(THIRTY, FIFTEEN),
        [THIRTY]: this.buildScore(THIRTY, THIRTY),
        [FORTY]: this.buildScore(THIRTY, FORTY),
        [GAME]: WIN_FOR_PLAYER2
      },

      [FORTY]: {
        [LOVE]: this.buildScore(FORTY, LOVE),
        [FIFTEEN]: this.buildScore(FORTY, FIFTEEN),
        [THIRTY]: this.buildScore(FORTY, THIRTY),
        [FORTY]: DEUCE,
        [GAME]: ADVANTAGE_PLAYER2
      },

      [GAME]: {
        [LOVE]: WIN_FOR_PLAYER1,
        [FIFTEEN]: WIN_FOR_PLAYER1,
        [THIRTY]: WIN_FOR_PLAYER1,
        [FORTY]: ADVANTAGE_PLAYER1,
        [GAME]: DEUCE
      }
    };

    // eslint-disable-next-line security/detect-object-injection
    return lookup[p1][p2]

  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name) {
      this.player1Score += 1;
    }
    if (playerName === this.player2Name) {
      this.player2Score += 1;
    }
  }
}
