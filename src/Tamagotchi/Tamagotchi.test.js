import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import Tamagotchi from "./Tamagotchi";

test("renders the hungry bar", () => {
  const { getByText } = render(<Tamagotchi />);
  const hungryBar = getByText(/Hungry:/i);
  expect(hungryBar).toBeInTheDocument();
});

test("renders the tired bar", () => {
  const { getByText } = render(<Tamagotchi />);
  const hungryBar = getByText(/Tired:/i);
  expect(hungryBar).toBeInTheDocument();
});

test("renders the initial egg", () => {
  const { getByText } = render(<Tamagotchi />);
  const egg = getByText(/🥚/i);
  expect(egg).toBeInTheDocument();
});

test("renders the start button", () => {
  const { getByText } = render(<Tamagotchi />);
  const start = getByText(/start/i);
  expect(start).toBeInTheDocument();
});

test("starts the tamagochi once the button is clicked", async () => {
  const { getByText, getByTestId } = render(<Tamagotchi />);
  fireEvent.click(getByTestId("buttonB"));

  const feedButton = await waitForElement(() => getByText(/feed/i));
  expect(feedButton).toBeInTheDocument();
});
