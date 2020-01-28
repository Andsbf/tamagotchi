import Tamagotchi from "./Tamagotchi";
import { getNextState } from "./TamagotchiUtils";

describe("getNextState", () => {
  test("returns deathReason: Age, if tamagochi has reach life span", () => {
    const result = getNextState({ timeTick: Tamagotchi.LIFE_SPAN });

    expect(result).toEqual({
      deathReason: "Age"
    });
  });

  test("returns deathReason: Dirtiness, if tamagochi has reach max poo count", () => {
    const result = getNextState({
      state: { pooCount: Tamagotchi.MAX_POO_COUNT }
    });

    expect(result).toEqual({
      deathReason: "Dirtiness"
    });
  });

  test("returns deathReason: hungry, if tamagochi has reach max hungry level", () => {
    const result = getNextState({ state: { hungryness: 100 } });

    expect(result).toEqual({
      deathReason: "Hungry"
    });
  });

  test("returns deathReason: tired, if tamagochi has reach max tired level", () => {
    const result = getNextState({ state: { tiredness: 100 } });

    expect(result).toEqual({
      deathReason: "Tired"
    });
  });

  test("increments pooCount, if there is poo scheduled for that tick", () => {
    const result = getNextState({
      state: { pooCount: 2 },
      timeTick: 1,
      pooSchedule: [1],
      sleepSchedule: []
    });

    expect(result.pooCount).toEqual(3);
  });

  test("does NOT increment pooCount, if there isn't poo scheduled for that tick", () => {
    const result = getNextState({
      state: { pooCount: 2 },
      timeTick: 1,
      pooSchedule: [2],
      sleepSchedule: []
    });

    expect(result.pooCount).toEqual(2);
  });

  test("increments hungry", () => {
    const result = getNextState({
      state: { hungryness: 10 },
      pooSchedule: [1],
      sleepSchedule: []
    });

    expect(result.hungryness > 10).toEqual(true);
  });
});
