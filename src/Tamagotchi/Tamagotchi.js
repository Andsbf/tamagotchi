import React, { Component } from "react";
import Background from "./Background";
import style from "./style.module.css";
import { random, range, isNil } from "../lib";
import emojis from "./emojis";
import { getNextState } from "./TamagotchiUtils";
import Bars from "./Bars";
import PooPile from "./PooPile";

class Tamagotchi extends Component {
  static TICKS_PER_SECOND = 2;
  static LIFE_SPAN = 180; /* time ticks */
  static HUNGRY_PERIOD = 30; /* in seconds, how often it has to eat at least once */
  static HUNGRY_INCREMENT =
    100 / (Tamagotchi.TICKS_PER_SECOND * Tamagotchi.HUNGRY_PERIOD);
  static TIRED_PERIOD = 30; /* in seconds, how often it has to sleep at least once */
  static TIRED_INCREMENT =
    100 / (Tamagotchi.TICKS_PER_SECOND * Tamagotchi.TIRED_PERIOD);
  static FOOD_SIZE = 50;
  static POO_FREQ = 20; /* ticks */
  static SLEEP_FREQ = 20; /* ticks */

  /*  generates a random schedule of events for specifed frequency */
  static generateSchedule(frequency) {
    const framesCount = Math.floor(Tamagotchi.LIFE_SPAN / frequency);

    return range(0, framesCount - 1).map(
      i => frequency * i + random(0, frequency)
    );
  }

  static STAGES = {
    egg: {
      emoji: emojis.egg,
      tickLimit: 0
    },
    hatching: {
      emoji: emojis.hatchingChick,
      tickLimit: 1
    },
    chick: {
      emoji: emojis.chick,
      tickLimit: 60
    },
    rooster: {
      emoji: emojis.rooster,
      tickLimit: 120
    },
    dead: {
      emoji: emojis.skull,
      tickLimit: Tamagotchi.LIFE_SPAN
    }
  };

  constructor(props) {
    super(props);

    this.pooSchedule = Tamagotchi.generateSchedule(Tamagotchi.POO_FREQ);
    this.sleepSchedule = Tamagotchi.generateSchedule(Tamagotchi.SLEEP_FREQ);
    this.timeTick = 0;
    this.interval = null;

    this.state = {
      awakeTick: null,
      pooCount: 0,
      hungryness: 0,
      tiredness: 0,
      deathReason: null
    };
  }

  get hasStarted() {
    return !isNil(this.interval);
  }

  get isDead() {
    return this.state.deathReason !== null;
  }

  get isSleeping() {
    return this.state.awakeTick !== null;
  }

  get hasPoo() {
    return this.state.pooCount > 0;
  }

  start = () => {
    const timeInterval = 1000 / Tamagotchi.TICKS_PER_SECOND;

    this.interval = setInterval(this.processTimeStep, timeInterval);
  };

  cleanPoo = () => {
    this.setState({
      pooCount: 0,
      awakeTick: null
    });
  };

  processTimeStep = () => {
    const nextState = getNextState(this);

    this.setState(nextState);

    if (!isNil(nextState.deathReason)) {
      clearInterval(this.interval);
    }
  };

  feed = () => {
    this.setState({
      hungryness: Math.max(this.state.hungryness - Tamagotchi.FOOD_SIZE, 0),
      awakeTick: null
    });
  };

  awake = () => {
    this.setState({
      awakeTick: null
    });
  };

  goSleep = () => {
    this.setState({
      awakeTick: this.timeTick + random(1, 30)
    });
  };

  getImg = () => {
    switch (true) {
      case this.isDead:
        return emojis.skull;

      case this.isSleeping:
        return emojis.Zzz;

      case this.timeTick >= Tamagotchi.STAGES.dead.tickLimit:
        return Tamagotchi.STAGES.dead.emoji;

      case this.timeTick >= Tamagotchi.STAGES.rooster.tickLimit:
        return Tamagotchi.STAGES.rooster.emoji;

      case this.timeTick >= Tamagotchi.STAGES.chick.tickLimit:
        return Tamagotchi.STAGES.chick.emoji;

      case this.timeTick >= Tamagotchi.STAGES.hatching.tickLimit:
        return Tamagotchi.STAGES.hatching.emoji;

      case this.timeTick >= Tamagotchi.STAGES.egg.tickLimit:
        return Tamagotchi.STAGES.egg.emoji;

      default:
        console.log("ERROR: Unmapped stage");
    }
  };

  getButtons = () => {
    const actions = {
      start: { text: "start", click: this.start },
      feed: { text: "Feed", click: this.feed },
      awake: { text: "Awake", click: this.awake },
      clean: { text: "Clean", click: this.cleanPoo },
      sleep: { text: "Sleep", click: this.goSleep }
    };

    if (!this.hasStarted) {
      return [null, actions.start, null];
    }

    if (this.isDead) {
      return [];
    }

    return [
      actions.feed,
      this.isSleeping ? actions.awake : actions.sleep,
      this.hasPoo ? actions.clean : null
    ];
  };

  render() {
    return (
      <div>
        <Background buttonsActions={this.getButtons()}>
          <div className={style.screen}>
            <Bars
              hungryness={this.state.hungryness}
              tiredness={this.state.tiredness}
            />
            <div
              className={style.emoji}
              dangerouslySetInnerHTML={{ __html: this.getImg() }}
            />
            {this.hasPoo && <PooPile count={this.state.pooCount} />}
            {this.isDead && <div className={style.deathText}>Death cause: {this.state.deathReason}</div>}
          </div>
        </Background>

      </div>
    );
  }
}

Tamagotchi.displayName = "Tamagotchi";

Tamagotchi.propTypes = {};

export default Tamagotchi;
