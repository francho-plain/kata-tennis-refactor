import { TennisGame } from "./TennisGame";

const LOVE = 0;
const FIFTEEN = 1;
const THIRTY = 2;
const GAME = 4;

const ADVATAGE_PLAYER1_MARGIN = 1;
const ADVATAGE_PLAYER2_MARGIN = -1;
const WIN_MARGIN = 2;

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
      return "Love-All";
    }
    if (this.player1Score === FIFTEEN) {
      return "Fifteen-All";
    }
    if (this.player1Score === THIRTY) {
      return "Thirty-All";
    }
    return "Deuce";
  }

  private getEndGameScore(): string {
    if (this.player1Score - this.player2Score === ADVATAGE_PLAYER1_MARGIN) {
      return "Advantage " + this.player1Name;
    }
    if (this.player1Score - this.player2Score === ADVATAGE_PLAYER2_MARGIN) {
      return "Advantage " + this.player2Name;
    }
    if (this.player1Score - this.player2Score >= WIN_MARGIN) {
      return "Win for " + this.player1Name;
    }
    return "Win for " + this.player2Name;
  }

  private getRegularScore(): string {
    return `${this.scoreName(this.player1Score)}-${this.scoreName(this.player2Score)}`;
  }

  private scoreName(score: number): string {
    if (score === LOVE) {
      return "Love";
    }
    if (score === FIFTEEN) {
      return "Fifteen";
    }
    if (score === THIRTY) {
      return "Thirty";
    }
    return "Forty";
  }
}
