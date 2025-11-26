import { TennisGame } from './TennisGame';

const WINNING_SCORE = 4;
const DEUCE_SCORE = 3;
const SCORE_NAMES: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];
const ADVANTAGE_POINT = 1;


const isAdvantage = (player1Score: number, player2Score: number): boolean => Math.abs(player1Score - player2Score) === ADVANTAGE_POINT;
const isDraw = (player1Score: number, player2Score: number): boolean => player1Score === player2Score; 
const hasWinnerScore = (player1Score: number, player2Score: number): boolean => Math.max(player1Score, player2Score) >= WINNING_SCORE ;
const leadingPlayer = (player1Score: number, player2Score: number, player1Name: string, player2Name: string): string =>
  player1Score > player2Score ? player1Name : player2Name;


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
    if (isDraw(this.player1Score, this.player2Score)) {
      return (this.player1Score >= DEUCE_SCORE) ? 'Deuce' : `${SCORE_NAMES[this.player1Score]}-All`;
    }
    
    if (!hasWinnerScore(this.player1Score, this.player2Score)) {
      return  SCORE_NAMES[this.player1Score] + '-' + SCORE_NAMES[this.player2Score];
    }

    const leading = leadingPlayer(this.player1Score, this.player2Score, this.player1Name, this.player2Name);
    return isAdvantage(this.player1Score, this.player2Score) ? 'Advantage ' + leading : 'Win for ' + leading;
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1') { this.player1Score += 1; }
    else { this.player2Score += 1; }
  }
}
