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
    let result: string;

    if (this.player1Score === this.player2Score) {
      result = this.getTieScore();
    } else if (this.player1Score >= GAME || this.player2Score >= GAME) {
      result = this.getEndGameScore();
    } else {
      result = this.getRegularScore();
    }

    return result;
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
    } else if (this.player1Score === FIFTEEN) {
      return "Fifteen-All";
    } else if (this.player1Score === THIRTY) {
      return "Thirty-All";
    } else {
      return "Deuce";
    }
  }

  private getEndGameScore(): string {
    let endGameScore: string;

    if (this.player1Score - this.player2Score === ADVATAGE_PLAYER1_MARGIN) {
      endGameScore = "Advantage " + this.player1Name;
    } else if (
      this.player1Score - this.player2Score ===
      ADVATAGE_PLAYER2_MARGIN
    ) {
      endGameScore = "Advantage " + this.player2Name;
    } else if (this.player1Score - this.player2Score >= WIN_MARGIN) {
      endGameScore = "Win for " + this.player1Name;
    } else {
      endGameScore = "Win for " + this.player2Name;
    }

    return endGameScore;
  }

  private getRegularScore(): string {
    const score1: string = this.scoreName(this.player1Score);
    const score2: string = this.scoreName(this.player2Score);

    return `${score1}-${score2}`;
  }

  private scoreName(score: number): string {
    if (score === LOVE) {
      return "Love";
    } else if (score === FIFTEEN) {
      return "Fifteen";
    } else if (score === THIRTY) {
      return "Thirty";
    } else {
      return "Forty";
    }
  }
}
