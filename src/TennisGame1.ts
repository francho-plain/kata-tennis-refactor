import { TennisGame } from './TennisGame';

const EVEN_SCORES = ['Love', 'Fifteen', 'Thirty', 'Forty'];
const WINNING_SCORE: number = 3;
const getScoreName = (score: number):string => EVEN_SCORES[score] || '';



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
    return this.getEvenScore()
      || this.getAdvantageOrWinScore()
      || this.getNormalScore();
  }

  private getEvenScore(): string | null {
    if (this.player1Score !== this.player2Score) {
      return null;
    }

    return this.player1Score < WINNING_SCORE ? `${EVEN_SCORES[this.player1Score]}-All` : 'Deuce';
  }

  private getNormalScore(): string {
    return `${getScoreName(this.player1Score)}-${getScoreName(this.player2Score)}`;
  }

  private getAdvantageOrWinScore(): string | null {

    if (this.player1Score <= WINNING_SCORE && this.player2Score <= WINNING_SCORE) {
      return null;
    }
    const minusResult = this.player1Score - this.player2Score;
    if (minusResult === 1) { return `Advantage ${this.player1Name}`; }
    if (minusResult === -1) { return `Advantage ${this.player2Name}`; }
    if (minusResult >= 2) { return `Win for ${this.player1Name}`; }
    return `Win for ${this.player2Name}`;
  }
}
