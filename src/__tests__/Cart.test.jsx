import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";
import { CartContext } from "../contexts";

test("snapshot with nothing in cart", () => {
  const { asFragment } = render(
    <CartContext.Provider value={[[], () => {}]}>
      <Cart />
    </CartContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});