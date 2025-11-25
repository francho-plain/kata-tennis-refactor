import { TennisGame } from './TennisGame';

export class TennisGame3 implements TennisGame {
  private player2Score: number = 0;
  private player1Score: number = 0;
  private readonly player1Name: string;
  private readonly player2Name: string;

  constructor(p1N: string, p2N: string) {
    this.player1Name = p1N;
    this.player2Name = p2N;
  }

  getScore(): string {
    let score: string;
    if (this.player1Score < 4 && this.player2Score < 4 && !(this.player1Score + this.player2Score === 6)) {
      const p: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];
      score = p[this.player1Score];
      return (this.player1Score === this.player2Score) ? score + '-All' : score + '-' + p[this.player2Score];
    } else {
      if (this.player1Score === this.player2Score)
        {return 'Deuce';}
      score = this.player1Score > this.player2Score ? this.player1Name : this.player2Name;
      return (((this.player1Score - this.player2Score) * (this.player1Score - this.player2Score)) === 1) ? 'Advantage ' + score : 'Win for ' + score;
    }
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      {this.player1Score += 1;}
    else
      {this.player2Score += 1;}
  }
}
