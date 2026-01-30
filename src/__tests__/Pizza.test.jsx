import { render, screen, cleanup } from "@testing-library/react";
import Pizza from "../Pizza";
import {expect, test, afterEach} from "vitest";

afterEach(() => {
  cleanup();
});

test("alt test renders on Pizza image", async () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description="super cool pizza" image={src} />
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});


