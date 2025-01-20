import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../Counter";

test("renders counter component", () => {
  render(<Counter />);
  expect(screen.getByText(/Counter:/)).toBeInTheDocument();
});

test("increments counter on button click", () => {
  render(<Counter />);
  const btnIncrement = screen.getByText("Increment");
  fireEvent.click(btnIncrement);
  expect(screen.getByText("Counter: 1")).toBeInTheDocument();
});

test("increments counter value on button click for multiple times", () => {
  render(<Counter />);
  const btnIncrement = screen.getByText("Increment");
  fireEvent.click(btnIncrement);
  fireEvent.click(btnIncrement);
  fireEvent.click(btnIncrement);
  expect(screen.getByText("Counter: 3")).toBeInTheDocument();
});

test("decrement button click check", () => {
  render(<Counter />);
  const btnIncrement = screen.getByText("Increment");
  fireEvent.click(btnIncrement);
  const btnDecrement = screen.getByText("Decrement");
  fireEvent.click(btnDecrement);

  expect(screen.getByText("Counter: 0")).toBeInTheDocument();
});

test("disables the decrement button if count is 0", () => {
  render(<Counter />);
  const btnIncrement = screen.getByText("Increment");
  fireEvent.click(btnIncrement);
  const btnDecrement = screen.getByText("Decrement");
  fireEvent.click(btnDecrement);
  expect(btnDecrement).toBeDisabled();
});
