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
    let score: string = '';
    if (this.playerOneScore === this.playerTwoScore && this.playerOneScore < 4) {
      score = this.scoreToString(this.playerOneScore);
      score += '-All';
    }
    if (this.playerOneScore === this.playerTwoScore && this.playerOneScore >= 3) {
      score = 'Deuce';
    }

    if (this.playerOneScore > 0 && this.playerTwoScore === 0) {
      this.playerOneResult = this.scoreToString(this.playerOneScore);

      this.playerTwoResult = 'Love';
      score = this.playerOneResult + '-' + this.playerTwoResult;
    }
    if (this.playerTwoScore > 0 && this.playerOneScore === 0) {
      this.playerTwoResult = this.scoreToString(this.playerTwoScore);

      this.playerOneResult = 'Love';
      score = this.playerOneResult + '-' + this.playerTwoResult;
    }

    if (this.playerOneScore > this.playerTwoScore && this.playerOneScore < 4) {
      this.playerOneResult = this.scoreToString(this.playerOneScore);
      this.playerTwoResult = this.scoreToString(this.playerTwoScore);
      score = this.playerOneResult + '-' + this.playerTwoResult;
    }
    if (this.playerTwoScore > this.playerOneScore && this.playerTwoScore < 4) {
      this.playerOneResult = this.scoreToString(this.playerOneScore);
      this.playerTwoResult = this.scoreToString(this.playerTwoScore);
      score = this.playerOneResult + '-' + this.playerTwoResult;
    }

    if (this.playerOneScore > this.playerTwoScore && this.playerTwoScore >= 3) {
      score = 'Advantage player1';
    }

    if (this.playerTwoScore > this.playerOneScore && this.playerOneScore >= 3) {
      score = 'Advantage player2';
    }

    if (this.playerOneScore >= 4 && this.playerTwoScore >= 0 && (this.playerOneScore - this.playerTwoScore) >= 2) {
      score = 'Win for player1';
    }
    if (this.playerTwoScore >= 4 && this.playerOneScore >= 0 && (this.playerTwoScore - this.playerOneScore) >= 2) {
      score = 'Win for player2';
    }
    return score;
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
