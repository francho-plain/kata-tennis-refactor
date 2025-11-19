import { TennisGame } from './TennisGame';

const EVEN_SCORES = ['Love', 'Fifteen', 'Thirty', 'Forty'];
const WINNING_SCORE: number = 3;


export class TennisGame1 implements TennisGame {
  private player1Score: number = 0;
  private player2Score: number = 0;
  private readonly player1Name: string;
  private readonly player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name) {
      this.player1Score += 1;
    } else if (playerName === this.player2Name) {
      this.player2Score += 1;
    }
  }

  getScore(): string {
    return this.getEvenScore(this.player1Score)
      || this.getAdvantageOrWinScore(this.player1Score, this.player2Score)
      || this.getNormalScore(this.player1Score, this.player2Score);
  }

  private getEvenScore(score: number): string | null {
    if (this.player1Score !== this.player2Score) {
      return null;
    }

    return score < WINNING_SCORE ? `${EVEN_SCORES[score]}-All` : 'Deuce';
  }

  private getNormalScore(score1: number, score2: number): string {
    return `${this.getScoreName(score1)}-${this.getScoreName(score2)}`;
  }

  private getScoreName(score: number): string {
    return EVEN_SCORES[score] || '';
  }

  private getAdvantageOrWinScore(score1: number, score2: number): string | null {

    if (this.player1Score <= WINNING_SCORE && this.player2Score <= WINNING_SCORE) {
      return null;
    }
    const minusResult = score1 - score2;
    if (minusResult === 1) { return `Advantage ${this.player1Name}`; }
    if (minusResult === -1) { return `Advantage ${this.player2Name}`; }
    if (minusResult >= 2) { return `Win for ${this.player1Name}`; }
    return `Win for ${this.player2Name}`;
  }
}
