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
     const scores = ['Love', 'Fifteen', 'Thirty', 'Forty'];
    this.playerOneResult = scores[this.playerOneScore];
    this.playerTwoResult = scores[this.playerTwoScore];

    return this.winScore()
      || this.drawScore()
      || this.loveScore()
      || this.advantageScore()
      || this.playerOneResult + '-' + this.playerTwoResult
  }

  private drawScore(): string | null {
    if (this.playerOneScore !== this.playerTwoScore) {
      return null;
    }

    if (this.playerOneScore >= 3) {
      return 'Deuce';
    } else {
      return this.playerOneResult + '-All';
    }
  }

  private winScore(): string | null {
    if (this.playerOneScore >= 4  && (this.playerOneScore - this.playerTwoScore) >= 2) {
      return `Win for ${this.playerOneName}`;
    }
    if (this.playerTwoScore >= 4  && (this.playerTwoScore - this.playerOneScore) >= 2) {
      return `Win for ${this.playerTwoName}`;
    }
    return null;
  }

  private advantageScore(): string | null {
    if (this.playerOneScore > this.playerTwoScore && this.playerTwoScore >= 3) {
      return `Advantage ${this.playerOneName}`;
    }
    if (this.playerTwoScore > this.playerOneScore && this.playerOneScore >= 3) {
      return `Advantage ${this.playerTwoName}`;
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

  wonPoint(player: string): void {
    if (player === this.playerOneName) { this.playerOneScore++; }
    if (player === this.playerTwoName) { this.playerTwoScore++; }
  }
}
