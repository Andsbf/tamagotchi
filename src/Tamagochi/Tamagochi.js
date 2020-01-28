import React, { Component } from "react";
import Background from "./Background";
import style from "./style.module.css";
import { random, range, isNil } from "../lib";
import PropTypes from "prop-types";
import emojis from "./emojis";
import { getNextState } from "./businessLogic"


class Tamagochi extends Component {
  static TIME_TICK_PER_SECOND = 2;
  static LIFE_SPAN = 180; /* time ticks */
  static HUNGRY_PERIOD = 30 /* in seconds, how often it has to eat at least once */
  static HUNGRY_INCREMENT = 100 / (Tamagochi.TIME_TICK_PER_SECOND * Tamagochi.HUNGRY_PERIOD);
  static TIRED_PERIOD = 30 /* in seconds, how often it has to sleep at least once */
  static TIRED_INCREMENT = 100 / (Tamagochi.TIME_TICK_PER_SECOND * Tamagochi.TIRED_PERIOD);
  static FOOD_SIZE = 50;
  static POO_FREQ = 20 /* ticks */
  static SLEEP_FREQ = 20 /* ticks */

  static generateSchedule (frequency) {
    const framesCount = Math.floor(Tamagochi.LIFE_SPAN / frequency);

    return range(0, framesCount - 1).map(i => (frequency * i) + random(0,frequency));
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
      tickLimit: Tamagochi.LIFE_SPAN
    }
  }

  constructor(props) {
    super(props);

    const {pooSchedule, sleepSchedule} =

    this.pooSchedule = Tamagochi.generateSchedule(Tamagochi.POO_FREQ);
    this.sleepSchedule = Tamagochi.generateSchedule(Tamagochi.SLEEP_FREQ);
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

  get hasStarted () {
    return !isNil(this.interval);
  }

  get isDead () {
    return this.state.deathReason !== null;
  }

  get isSleeping () {
    return this.state.awakeTick !== null;
  }

  get hasPoo () {
    return this.state.pooCount > 0;
  }

  start = () => {
    const timeInterval = 1000 / Tamagochi.TIME_TICK_PER_SECOND;

    this.interval = setInterval(this.processTimeStep , timeInterval)
  }

  cleanPoo = () => {
    this.setState({
      pooCount: 0,
      awakeTick: null,
    })
  }

  processTimeStep = () => {
    const nextState = getNextState(this);

    this.setState(nextState);

    if(!isNil(nextState.deathReason)) {
      clearInterval(this.interval);
    }
  }

  feed = () => {
    this.setState({
      hungryness: Math.max(this.state.hungryness - Tamagochi.FOOD_SIZE, 0),
      awakeTick: null
    })
  }

  awake = () => {
    this.setState({
      awakeTick: null
    })
  }

  goSleep = () => {
    this.setState({
      awakeTick: this.timeTick + random(1,30)
    })
  }

  getImg = () => {
    switch(true) {
      case this.isDead:
        return emojis.skull;

      case this.isSleeping:
        return emojis.Zzz;

      case (this.timeTick >= Tamagochi.STAGES.dead.tickLimit):
        return Tamagochi.STAGES.dead.emoji;

      case (this.timeTick >= Tamagochi.STAGES.rooster.tickLimit):
        return Tamagochi.STAGES.rooster.emoji;

      case (this.timeTick >= Tamagochi.STAGES.chick.tickLimit):
        return Tamagochi.STAGES.chick.emoji;

      case (this.timeTick >= Tamagochi.STAGES.hatching.tickLimit):
        return Tamagochi.STAGES.hatching.emoji;

      case (this.timeTick >= Tamagochi.STAGES.egg.tickLimit):
        return Tamagochi.STAGES.egg.emoji;

      default: console.log("ERROR: Unmapped stage");
      }
    }

  start

  getButtons = () => {
    const actions = {
      start: { text: "start", click: this.start},
      feed: { text: "Feed", click: this.feed},
      awake: { text: "Awake", click: this.awake},
      clean: { text: "Clean", click: this.cleanPoo},
      sleep: { text: "Sleep", click: this.goSleep},
    }


    if(!this.hasStarted) {
      return [ null, actions.start, null ]
    }

    if(this.isDead) {
      return []
    }

    return [
      actions.feed,
      this.isSleeping ? actions.awake : actions.sleep,
      this.hasPoo ? actions.clean : null
    ]
  }

  renderPooStack = () => {
    if(!this.hasPoo) {
      return null
    }

    return(
      <div  className={style.pooStack}>
        {new Array(this.state.pooCount).fill().map( _ =>
          <div dangerouslySetInnerHTML={{__html: emojis.poo}}/>
        )}
      </div>
    );
  }

  renderBars = () => {
    return [
      <div className={style.stat}>
        <span>Hungry:</span>
        <progress max="100" value={this.state.hungryness}/>
      </div>,
      <div className={style.stat}>
        <span>Tired:</span>
        <progress max="100" value={this.state.tiredness}/>
      </div>
    ];
  }

  render() {
    return(
      <div>
        <Background
          buttonsActions={this.getButtons()}
        >
          <div className={style.screen}>
            {this.renderBars()}
            <div className={style.emoji} dangerouslySetInnerHTML={{__html: this.getImg()}} />
            {this.renderPooStack()}
          </div>
        </Background>
        <div>
          Death reason: {this.state.deathReason}
        </div>
      </div>
    );
  }
};

Tamagochi.displayName = "Tamagochi";

Tamagochi.propTypes = {};

export default Tamagochi;
