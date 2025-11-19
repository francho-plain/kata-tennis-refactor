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
    if (playerName === this.player1Name) {
      this.m_score1 += 1;
    } 
    
    if(playerName === this.player2Name) {
      this.m_score2 += 1;
    }
  }

  getScore(): string {
    return this.getEvenScore(this.m_score1) 
      || this.getAdvantageOrWinScore(this.m_score1, this.m_score2) 
      || this.getNormalScore(this.m_score1, this.m_score2);
  }

  private getEvenScore(score: number): string | false {
    if (this.m_score1 !== this.m_score2) {
      return false
    }

    const EVEN_SCORES = [ 'Love-All', 'Fifteen-All', 'Thirty-All' ];
    return EVEN_SCORES[score] || 'Deuce';
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

  private getAdvantageOrWinScore(score1: number, score2: number): string | false {
    const WINNING_SCORE: number = 4;

    if (this.m_score1 < WINNING_SCORE && this.m_score2 < WINNING_SCORE) {
      return false
    }
    const minusResult = score1 - score2;
    if (minusResult === 1) {return 'Advantage player1';}
    if (minusResult === -1) {return 'Advantage player2';}
    if (minusResult >= 2) {return 'Win for player1';}
    return 'Win for player2';
  }
}
