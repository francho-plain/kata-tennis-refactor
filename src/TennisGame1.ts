import { TennisGame } from './TennisGame';

export class TennisGame1 implements TennisGame {
  private m_score1: number = 0;
  private m_score2: number = 0;
  private readonly player1Name: string;
  private readonly player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      this.m_score1 += 1;
    else
      this.m_score2 += 1;
  }

  getScore(): string {
    let score: string = '';
    let tempScore: number = 0;
    if (this.m_score1 === this.m_score2) {
      score = this.getEvenScore(this.m_score1);
    }
    else if (this.m_score1 >= 4 || this.m_score2 >= 4) {
      score = this.getAdvantageOrWinScore(this.m_score1, this.m_score2);
    }
    else {
      score = this.getNormalScore(this.m_score1, this.m_score2);
    }
    return score;
  }

  private getEvenScore(score: number): string {
    switch (score) {
      case 0:
        return 'Love-All';
      case 1:
        return 'Fifteen-All';
      case 2:
        return 'Thirty-All';
      default:
        return 'Deuce';
    }
  }

  private getNormalScore(score1: number, score2: number): string {
    return `${this.getScoreName(score1)}-${this.getScoreName(score2)}`;
  }

  private getScoreName(score: number): string {
    switch (score) {
      case 0:
        return 'Love';
      case 1:
        return 'Fifteen';
      case 2:
        return 'Thirty';
      case 3:
        return 'Forty';
      default:
        return '';
    }
  }

  private getAdvantageOrWinScore(score1: number, score2: number): string {
    const minusResult = score1 - score2;
    if (minusResult === 1) return 'Advantage player1';
    if (minusResult === -1) return 'Advantage player2';
    if (minusResult >= 2) return 'Win for player1';
    return 'Win for player2';
  }
}
