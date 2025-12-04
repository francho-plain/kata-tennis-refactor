import { TennisGame } from './TennisGame';

const WINNING_SCORE = 4;
const WIN_FOR_PLAYER1 = "Win for player1";
const WIN_FOR_PLAYER2 = "Win for player2";
const ADVANTAGE_PLAYER1 = "Advantage player1";
const ADVANTAGE_PLAYER2 = "Advantage player2";
const DEUCE = "Deuce";


export class TennisGame5 implements TennisGame {
  private readonly player2Name : string;
  private readonly player1Name : string;
  private player1Score: number;
  private player2Score: number;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.player1Score = 0;
    this.player2Score = 0;
  }

  getScore(): string {
    let p1 = this.player1Score;
    let p2 = this.player2Score;

    while (p1 > WINNING_SCORE || p2 > WINNING_SCORE) {
      p1--;
      p2--;
    }

    const lookup: { [key: number]: { [key: number]: string } } = {
      0: {0: "Love-All",
        1: "Love-Fifteen",
        2: "Love-Thirty",
        3: "Love-Forty",
        4: WIN_FOR_PLAYER2},

      1: {0: "Fifteen-Love",
        1: "Fifteen-All",
        2: "Fifteen-Thirty",
        3: "Fifteen-Forty",
        4: WIN_FOR_PLAYER2},

      2: {0: "Thirty-Love",
        1: "Thirty-Fifteen",
        2: "Thirty-All",
        3: "Thirty-Forty",
        4: WIN_FOR_PLAYER2},

      3: {0: "Forty-Love",
        1: "Forty-Fifteen",
        2: "Forty-Thirty",
        3: DEUCE,
        4: ADVANTAGE_PLAYER2},

      4: {0: WIN_FOR_PLAYER1,
        1: WIN_FOR_PLAYER1,
        2: WIN_FOR_PLAYER1,
        3: ADVANTAGE_PLAYER1,
        4: DEUCE}
    }

    // eslint-disable-next-line security/detect-object-injection
    return lookup[p1][p2]

  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name) {
      this.player1Score += 1;
    } 
    if(playerName === this.player2Name) {
      this.player2Score += 1;
    }
  }
}
