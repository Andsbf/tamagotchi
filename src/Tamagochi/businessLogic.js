import Tamagochi from "./Tamagochi";
import { random } from "../lib";

export const getNextState = (tamagochi) => {
  tamagochi.timeTick = tamagochi.timeTick + 1;

  const deathReason = getDeathReason();

  if(deathReason) {
    return {
      deathReason: deathReason
    }
  } else {
    return {
      awakeTick: getNextAwakeTick(),
      pooCount: getNextPooCount(),
      hungryness: getNextHungryness(),
      tiredness: getNextTiredness(),
    };
  }

  function getNextAwakeTick () {
    if(tamagochi.state.awakeTick === tamagochi.timeTick || tamagochi.state.tiredness === 0) {
      return null;
    }

    if(tamagochi.sleepSchedule.includes(tamagochi.timeTick)) {
      return tamagochi.timeTick + random(1,15)
    }

    return tamagochi.state.awakeTick;
  }

  function getNextPooCount () {
    if(tamagochi.pooSchedule.includes(tamagochi.timeTick)) {
      return tamagochi.state.pooCount + 1;
    } else {
      return tamagochi.state.pooCount;
    }
  }

  function getNextHungryness () {
    return Math.min(tamagochi.state.hungryness + Tamagochi.HUNGRY_INCREMENT, 100)
  }

  function getNextTiredness () {
    if( tamagochi.isSleeping ) {
      return Math.max(tamagochi.state.tiredness - Tamagochi.TIRED_INCREMENT, 0)
    } else {
      return Math.min(tamagochi.state.tiredness + Tamagochi.TIRED_INCREMENT, 100);
    }
  }

  function getDeathReason () {
    if(tamagochi.timeTick === Tamagochi.LIFE_SPAN) {
      return  "Age";
    }

    if(tamagochi.state.pooCount === 3) {
      return "Dirtyness";
    }

    if(tamagochi.state.hungryness === 100 || tamagochi.state.tiredness === 100) {
      return "hungry/tired";
    }
  }
}
