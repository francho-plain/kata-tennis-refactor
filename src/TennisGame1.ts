import { Score } from './Score';
import { TennisGame } from './TennisGame';


export class TennisGame1 implements TennisGame {

  private readonly score: Score

  constructor(player1Name: string, player2Name: string) {
    this.score = new Score(player1Name, player2Name);
  }

  wonPoint(playerName: string): void {
    this.score.wonPoint(playerName);
  }

  getScore(): string {
    return this.score.toString();
  }

  
}
