import { TennisGame } from './TennisGame';

export class TennisGame2 implements TennisGame {
  playerOneScore: number = 0;
  playerTwoScore: number = 0;

  playerOneResult: string = '';
  playerTwoResult: string = '';

  private readonly playerOneName: string;
  private readonly playerTwoName: string;

  constructor(playerOneName: string, playerTwoName: string) {
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;
  }

  getScore(): string {

    this.playerOneResult = this.scoreToString(this.playerOneScore);
    this.playerTwoResult = this.scoreToString(this.playerTwoScore);

    return  this.winScore() 
      || this.drawScore()
      || this.loveScore()
      || this.advantageScore()
      || this.playerOneResult + '-' + this.playerTwoResult
    
  }

  private drawScore(): string | null {
    if (this.playerOneScore === this.playerTwoScore) {
      if (this.playerOneScore >= 3) {
        return 'Deuce';
      } else {
        return this.playerOneResult + '-All';
      }
    }
    return null;
  }

  private winScore(): string | null {
    if (this.playerOneScore >= 4 && this.playerTwoScore >= 0 && (this.playerOneScore - this.playerTwoScore) >= 2) {
      return 'Win for player1';
    }
    if (this.playerTwoScore >= 4 && this.playerOneScore >= 0 && (this.playerTwoScore - this.playerOneScore) >= 2) {
      return 'Win for player2';
    }
    return null;
  }

  private advantageScore(): string | null {
    if (this.playerOneScore > this.playerTwoScore && this.playerTwoScore >= 3) {
      return 'Advantage player1';
    }

    if (this.playerTwoScore > this.playerOneScore && this.playerOneScore >= 3) {
      return 'Advantage player2';
    }
    return null;
  }

  private loveScore(): string | null {
    if (this.playerOneScore > 0 && this.playerTwoScore === 0) {

      this.playerTwoResult = 'Love';
      return this.playerOneResult + '-' + this.playerTwoResult;
    }
    if (this.playerTwoScore > 0 && this.playerOneScore === 0) {

      this.playerOneResult = 'Love';
      return this.playerOneResult + '-' + this.playerTwoResult;
    }
    return null;
  }

  private scoreToString(score: number): string {
    if (score === 0) {
      return 'Love';
    }
    if (score === 1) {
      return 'Fifteen';
    }
    if (score === 2) {
      return 'Thirty';
    }
    return 'Forty';
  }

  SetP1Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.P1Score();
    }
  }

  SetP2Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.P2Score();
    }
  }

  P1Score(): void {
    this.playerOneScore++;
  }

  P2Score(): void {
    this.playerTwoScore++;
  }

  wonPoint(player: string): void {
    if (player === 'player1') { this.P1Score(); }
    else { this.P2Score(); }
  }
}
