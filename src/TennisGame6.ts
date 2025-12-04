import { TennisGame } from "./TennisGame";

const LOVE = 0;
const FIFTEEN = 1;
const THIRTY = 2;
const GAME = 4;

const ADVATAGE_PLAYER1_MARGIN = 1;
const ADVATAGE_PLAYER2_MARGIN = -1;
const WIN_MARGIN = 2;

const LOVE_ALL = "Love-All";
const FIFTEEN_ALL = "Fifteen-All";
const THIRTY_ALL = "Thirty-All";
const DEUCE = "Deuce";
const LOVE_SCORE = "Love";
const FIFTEEN_SCORE = "Fifteen";
const THIRTY_SCORE = "Thirty";
const FORTY_SCORE = "Forty";
const ADVANTAGE = "Advantage";
const WIN_FOR = "Win for";

export class TennisGame6 implements TennisGame {
  private player2Name: string;
  private player1Name: string;
  private player1Score: number;
  private player2Score: number;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.player1Score = 0;
    this.player2Score = 0;
  }

  getScore(): string {
    if (this.player1Score === this.player2Score) {
      return this.getTieScore();
    }
    if (this.player1Score >= GAME || this.player2Score >= GAME) {
      return this.getEndGameScore();
    }
    return this.getRegularScore();
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name) {
      this.player1Score += 1;
    } else {
      this.player2Score += 1;
    }
  }

  private getTieScore(): string {
    if (this.player1Score === LOVE) {
      return LOVE_ALL;
    }
    if (this.player1Score === FIFTEEN) {
      return FIFTEEN_ALL;
    }
    if (this.player1Score === THIRTY) {
      return THIRTY_ALL;
    }
    return DEUCE;
  }

  private getEndGameScore(): string {
    if (this.player1Score - this.player2Score === ADVATAGE_PLAYER1_MARGIN) {
      return `${ADVANTAGE} ${this.player1Name}`;
    }
    if (this.player1Score - this.player2Score === ADVATAGE_PLAYER2_MARGIN) {
      return `${ADVANTAGE} ${this.player2Name}`;
    }
    if (this.player1Score - this.player2Score >= WIN_MARGIN) {
      return `${WIN_FOR} ${this.player1Name}`;
    }
    return `${WIN_FOR} ${this.player2Name}`;
  }

  private getRegularScore(): string {
    return `${this.scoreName(this.player1Score)}-${this.scoreName(
      this.player2Score
    )}`;
  }

  private scoreName(score: number): string {
    if (score === LOVE) {
      return LOVE_SCORE;
    }
    if (score === FIFTEEN) {
      return FIFTEEN_SCORE;
    }
    if (score === THIRTY) {
      return THIRTY_SCORE;
    }
    return FORTY_SCORE;
  }
}
