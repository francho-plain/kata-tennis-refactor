import { TennisGame } from './TennisGame';

const WINNING_SCORE = 4;
const DEUCE_SCORE = 3;
const SCORE_NAMES: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];
const ADVANTAGE_POINT = 1;

// Predicados
const isAdvantage = (score1: number, score2: number): boolean =>
  Math.abs(score1 - score2) === ADVANTAGE_POINT;

const isDraw = (score1: number, score2: number): boolean =>
  score1 === score2;
const isRegularScore = (score1: number, score2: number): boolean =>
  Math.max(score1, score2) < WINNING_SCORE;

// Selectores
const getLeadingPlayer = (score1: number, score2: number, name1: string, name2: string): string => score1 > score2 ? name1 : name2;

// Funciones de formato
const formatDraw = (score: number): string => score >= DEUCE_SCORE ? 'Deuce' : `${SCORE_NAMES[score]}-All`;

const formatRegular = (score1: number, score2: number): string => `${SCORE_NAMES[score1]}-${SCORE_NAMES[score2]}`;

const formatEndGame = (score1: number, score2: number, name1: string, name2: string): string => {
  const leader = getLeadingPlayer(score1, score2, name1, name2);
  const prefix = isAdvantage(score1, score2 ) ? 'Advantage' : 'Win for';
  return `${prefix} ${leader}`;
};


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
    return isDraw(this.player1Score, this.player2Score)
      ? formatDraw(this.player1Score)
      : isRegularScore(this.player1Score, this.player2Score)
        ? formatRegular(this.player1Score, this.player2Score)
        : formatEndGame(this.player1Score, this.player2Score, this.player1Name, this.player2Name);
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1') { this.player1Score += 1; }
    else { this.player2Score += 1; }
  }
}