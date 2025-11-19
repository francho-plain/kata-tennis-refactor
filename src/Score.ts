
const EVEN_SCORES = ['Love', 'Fifteen', 'Thirty', 'Forty'];
const WINNING_SCORE: number = 3;
const getScoreName = (score: number): string => EVEN_SCORES[score] || '';
const ADVANTAGE_THRESHOLD = 1;

export class Score {
  private player1Score: number;
  private player2Score: number;

  private readonly player1Name: string;
  private readonly player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.player1Score = 0;
    this.player2Score = 0;
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name) {
      this.player1Score += 1;
    } else if (playerName === this.player2Name) {
      this.player2Score += 1;
    }
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
    if ( this.player1Score <= WINNING_SCORE && this.player2Score <= WINNING_SCORE) {
      return null;
    }

    const scoreDifference = this.player1Score - this.player2Score;
    const leadingPlayer = scoreDifference > 0 ? this.player1Name : this.player2Name;
    
    const absoluteDifference = Math.abs(scoreDifference);
    if (absoluteDifference === ADVANTAGE_THRESHOLD) {
      return `Advantage ${leadingPlayer}`;
    }

    return `Win for ${leadingPlayer}`;
  }

  toString(): string {
    return this.getEvenScore()
      || this.getAdvantageOrWinScore()
      || this.getNormalScore();
  }
}