import Tamagotchi from "./Tamagotchi";
import { random, isNil } from "../lib";

export const getNextState = tamagotchi => {
  const deathReason = getDeathReason(tamagotchi);

  if (!isNil(deathReason)) {
    return { deathReason: deathReason };
  } else {
    return getNextStateAttributes(tamagotchi);
  }
};

function getDeathReason(tamagotchi) {
  if (tamagotchi.timeTick === Tamagotchi.LIFE_SPAN) {
    return "Age";
  }

  if (tamagotchi.state.pooCount === Tamagotchi.MAX_POO_COUNT) {
    return "Dirtiness";
  }

  if (tamagotchi.state.hungryness === 100) {
    return "Hungry";
  }

  if (tamagotchi.state.tiredness === 100) {
    return "Tired";
  }
}

function getNextStateAttributes(tamagotchi) {
  return {
    awakeTick: getNextAwakeTick(),
    pooCount: getNextPooCount(),
    hungryness: getNextHungryness(),
    tiredness: getNextTiredness()
  };

  function getNextAwakeTick() {
    if (
      /* tamagotchi is set to awake up  at this tick*/
      tamagotchi.state.awakeTick === tamagotchi.timeTick ||
      /* tamagotchi has fully charged its  */
      tamagotchi.state.tiredness === 0
    ) {
      return null;
    }

    if (tamagotchi.sleepSchedule.includes(tamagotchi.timeTick)) {
      return tamagotchi.timeTick + random(1, 15);
    }

    return tamagotchi.state.awakeTick;
  }

  function getNextPooCount() {
    if (tamagotchi.pooSchedule.includes(tamagotchi.timeTick)) {
      return tamagotchi.state.pooCount + 1;
    } else {
      return tamagotchi.state.pooCount;
    }
  }

  function getNextHungryness() {
    return Math.min(
      tamagotchi.state.hungryness + Tamagotchi.HUNGRY_INCREMENT,
      100
    );
  }

  function getNextTiredness() {
    if (tamagotchi.isSleeping) {
      return Math.max(
        tamagotchi.state.tiredness - Tamagotchi.TIRED_INCREMENT,
        0
      );
    } else {
      return Math.min(
        tamagotchi.state.tiredness + Tamagotchi.TIRED_INCREMENT,
        100
      );
    }
  }
}
