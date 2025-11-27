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
    const result = new Deuce(
      this, new GameServer(
        this, new GameReceiver(
          this, new AdvantageServer(
            this, new AdvantageReceiver(
              this, new DefaultResult(this)))))).getResult();
    return result.format();
  }

  receiverHasAdvantage(): boolean {
    return this.receiverScore >= MIN_SCORE_FOR_GAME_END && (this.receiverScore - this.serverScore) === 1;
  }

  serverHasAdvantage(): boolean {
    return this.serverScore >= MIN_SCORE_FOR_GAME_END && (this.serverScore - this.receiverScore) === 1;
  }

  receiverHasWon(): boolean {
    return this.receiverScore >= MIN_SCORE_FOR_GAME_END && (this.receiverScore - this.serverScore) >= MIN_LEAD_FOR_GAME_END;
  }

  serverHasWon(): boolean {
    return this.serverScore >= MIN_SCORE_FOR_GAME_END && (this.serverScore - this.receiverScore) >= MIN_LEAD_FOR_GAME_END;
  }

  isDeuce(): boolean {
    return this.serverScore >= DEUCE_THRESHOLD && this.receiverScore >= DEUCE_THRESHOLD && (this.serverScore === this.receiverScore);
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

type NextResult = ScoreRule | GameServer | GameReceiver | AdvantageServer | AdvantageReceiver | DefaultResult;

abstract class ScoreRule {
  protected readonly game: TennisGame4;
  protected readonly nextResult: NextResult;

  constructor(game: TennisGame4, nextResult: NextResult) {
    this.game = game;
    this.nextResult = nextResult;
  }

  abstract matches(): boolean;
  abstract formatResult(): TennisResult;

  getResult(): TennisResult {
    if (this.matches()) {
      return this.formatResult();
    }
    return this.nextResult.getResult();
  }
}

class Deuce extends ScoreRule {
  matches(): boolean {
    return this.game.isDeuce();
  }

  formatResult(): TennisResult {
    return new TennisResult("Deuce", "");
  }
}

class GameServer extends ScoreRule {
  matches(): boolean {
    return this.game.serverHasWon();
  }

  formatResult(): TennisResult {
    return new TennisResult("Win for " + this.game.server, "");
  }
}

class GameReceiver {
  private readonly game: TennisGame4;
  private readonly nextResult: AdvantageServer;
  constructor(game: TennisGame4, nextResult: AdvantageServer) {
    this.game = game;
    this.nextResult = nextResult;
  }

  getResult(): TennisResult {
    if (this.game.receiverHasWon()) {
      return new TennisResult("Win for " + this.game.receiver, "");
    }
    return this.nextResult.getResult();
  }
}

class AdvantageServer {
  private readonly game: TennisGame4;
  private readonly nextResult: AdvantageReceiver;
  constructor(game: TennisGame4, nextResult: AdvantageReceiver) {
    this.game = game;
    this.nextResult = nextResult;
  }

  getResult(): TennisResult {
    if (this.game.serverHasAdvantage()) {
      return new TennisResult("Advantage " + this.game.server, "");
    }
    return this.nextResult.getResult();
  }
}

class AdvantageReceiver {
  private readonly game: TennisGame4;
  private readonly nextResult: DefaultResult;
  constructor(game: TennisGame4, nextResult: DefaultResult) {
    this.game = game;
    this.nextResult = nextResult;
  }

  getResult(): TennisResult {
    if (this.game.receiverHasAdvantage()) {
      return new TennisResult("Advantage " + this.game.receiver, "");
    }
    return this.nextResult.getResult();
  }
}

class DefaultResult {
  private readonly scores: string[];
  private readonly game: TennisGame4;
  constructor(game: TennisGame4) {
    this.scores = ["Love", "Fifteen", "Thirty", "Forty"];
    this.game = game;
  }

  getResult(): TennisResult {
    return new TennisResult(this.scores[this.game.serverScore], this.scores[this.game.receiverScore]);
  }
}
