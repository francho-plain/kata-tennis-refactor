import { TennisGame } from './TennisGame';

const MIN_SCORE_FOR_GAME_END = 4;
const MIN_LEAD_FOR_GAME_END = 2;
const DEUCE_THRESHOLD = 3;

export class TennisGame4 implements TennisGame {

  public server: string;
  public receiver: string;
  public serverScore: number;
  public receiverScore: number;

  constructor(player1: string, player2: string) {
    this.server = player1;
    this.receiver = player2;
    this.serverScore = 0;
    this.receiverScore = 0;
  }

  getScore(): string {
    const rules: ScoreRule[] = [
      new Deuce(this),
      new GameServer(this),
      new GameReceiver(this),
      new AdvantageServer(this),
      new AdvantageReceiver(this),
      new DefaultResult(this)
    ];

    for (const rule of rules) {
      const result = rule.getResult();
      if(result) {
        return result.format();
      }
    }

    return "ERROR: unknown result";
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1') {
      this.serverScore += 1;
    } else {
      this.receiverScore += 1;
    }
  }
}

class TennisResult {
  private readonly serverScore: string;
  private readonly receiverScore: string;
  constructor(serverScore: string, receiverScore: string) {
    this.serverScore = serverScore;
    this.receiverScore = receiverScore;
  }

  format(): string {
    if ("" === this.receiverScore) {
      return this.serverScore;
    }
    if (this.serverScore === this.receiverScore) {
      return this.serverScore + "-All";
    }
    return this.serverScore + "-" + this.receiverScore;
  }
}

abstract class ScoreRule {
  protected readonly game: TennisGame4;

  constructor(game: TennisGame4) {
    this.game = game;
  }

  abstract matches(): boolean;
  abstract formatResult(): TennisResult;

  getResult(): TennisResult|null {
    if (this.matches()) {
      return this.formatResult();
    }
    return null;
  }
}

class Deuce extends ScoreRule {
  private isDeuce(): boolean {
    return this.game.serverScore >= DEUCE_THRESHOLD && this.game.receiverScore >= DEUCE_THRESHOLD && (this.game.serverScore === this.game.receiverScore);
  }

  matches(): boolean {
    return this.isDeuce();
  }

  formatResult(): TennisResult {
    return new TennisResult("Deuce", "");
  }
}

class GameServer extends ScoreRule {
  serverHasWon(): boolean {
    return this.game.serverScore >= MIN_SCORE_FOR_GAME_END && (this.game.serverScore - this.game.receiverScore) >= MIN_LEAD_FOR_GAME_END;
  }

  matches(): boolean {
    return this.serverHasWon();
  }

  formatResult(): TennisResult {
    return new TennisResult("Win for " + this.game.server, "");
  }
}

class GameReceiver extends ScoreRule {

  private receiverHasWon(): boolean {
    return this.game.receiverScore >= MIN_SCORE_FOR_GAME_END && (this.game.receiverScore - this.game.serverScore) >= MIN_LEAD_FOR_GAME_END;
  }

  matches(): boolean {
    return this.receiverHasWon();
  }

  formatResult(): TennisResult {
    return new TennisResult("Win for " + this.game.receiver, "");
  }
}

class AdvantageServer extends ScoreRule {
  private serverHasAdvantage(): boolean {
    return this.game.serverScore >= MIN_SCORE_FOR_GAME_END && (this.game.serverScore - this.game.receiverScore) === 1;
  }

  matches(): boolean {
    return this.serverHasAdvantage();
  }

  formatResult(): TennisResult {
    return new TennisResult("Advantage " + this.game.server, "");
  }
}

class AdvantageReceiver extends ScoreRule {
  matches(): boolean {
    const receiverHasAdvantage = this.game.receiverScore >= MIN_SCORE_FOR_GAME_END && (this.game.receiverScore - this.game.serverScore) === 1;
    return receiverHasAdvantage;
  }

  formatResult(): TennisResult {
    return new TennisResult("Advantage " + this.game.receiver, "");
  }
}

class DefaultResult extends ScoreRule {
  private readonly scores: string[] = ["Love", "Fifteen", "Thirty", "Forty"];

  matches(): boolean {
    return true;
  }

  formatResult(): TennisResult {
    return new TennisResult(this.scores[this.game.serverScore], this.scores[this.game.receiverScore]);
  }
}
