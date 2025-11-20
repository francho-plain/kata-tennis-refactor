import { TennisGame } from './TennisGame';

const SCORE_NAMES = new Map<number, string>([
  [0, 'Love'],
  [1, 'Fifteen'], 
  [2, 'Thirty'],
  [3, 'Forty']
]);

const WINNING_SCORE = 4;
const DEUCE_THRESHOLD = 3;
const WIN_MARGIN = 2;
const LOVE_SCORE = 0;

export class TennisGame2 implements TennisGame {
  playerOneScore: number = 0;
  playerTwoScore: number = 0;

  private readonly playerOneName: string;
  private readonly playerTwoName: string;

  constructor(playerOneName: string, playerTwoName: string) {
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;
  }

  getScore(): string {

    return this.winScore()
      || this.drawScore()
      || this.loveScore()
      || this.advantageScore()
      || SCORE_NAMES.get(this.playerOneScore) + '-' + SCORE_NAMES.get(this.playerTwoScore)
  }

  wonPoint(player: string): void {
    if (player === this.playerOneName) { this.playerOneScore++; }
    if (player === this.playerTwoName) { this.playerTwoScore++; }
  }

  private winScore(): string | null {
    if (this.playerOneScore >= WINNING_SCORE && (this.playerOneScore - this.playerTwoScore) >= WIN_MARGIN) {
      return `Win for ${this.playerOneName}`;
    }
    if (this.playerTwoScore >= WINNING_SCORE && (this.playerTwoScore - this.playerOneScore) >= WIN_MARGIN) {
      return `Win for ${this.playerTwoName}`;
    }
    return null;
  }

  private drawScore(): string | null {
    if (this.playerOneScore !== this.playerTwoScore) {
      return null;
    }

    if (this.playerOneScore >= DEUCE_THRESHOLD) {
      return 'Deuce';
    } else {
      return SCORE_NAMES.get(this.playerOneScore) + '-All';
    }
  }

  private loveScore(): string | null {
    if (this.playerTwoScore === LOVE_SCORE) {
      return SCORE_NAMES.get(this.playerOneScore) + '-Love';
    }
    if (this.playerOneScore === LOVE_SCORE) {
      return 'Love-' + SCORE_NAMES.get(this.playerTwoScore);
    }
    return null;
  }

  private advantageScore(): string | null {
    if(this.playerOneScore <= DEUCE_THRESHOLD && this.playerTwoScore <= DEUCE_THRESHOLD ) {
      return null;
    }

    const player = (this.playerOneScore > this.playerTwoScore) ? this.playerOneName : this.playerTwoName;
    return `Advantage ${player}`;
  }

}
