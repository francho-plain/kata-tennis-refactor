import { TennisGame } from './TennisGame';

const WINNING_SCORE = 4;
const SCORE_NAMES: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];


export class TennisGame3 implements TennisGame {
  private player2Score: number = 0;
  private player1Score: number = 0;
  private readonly player1Name: string;
  private readonly player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore(): string {
    
    if (this.player1Score === this.player2Score) { return (this.player1Score >= WINNING_SCORE-1) ? 'Deuce' : `${SCORE_NAMES[this.player1Score]}-All`; }
    
    if (this.player1Score < WINNING_SCORE && this.player2Score < WINNING_SCORE) {
      return  SCORE_NAMES[this.player1Score] + '-' + SCORE_NAMES[this.player2Score];
    }
    
    const leadingPlayer = this.player1Score > this.player2Score ? this.player1Name : this.player2Name;
    return (((this.player1Score - this.player2Score) * (this.player1Score - this.player2Score)) === 1) ? 'Advantage ' + leadingPlayer : 'Win for ' + leadingPlayer;

  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1') { this.player1Score += 1; }
    else { this.player2Score += 1; }
  }
}
