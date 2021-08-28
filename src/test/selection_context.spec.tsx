import * as assert from "power-assert";
import React from "react";
import { PositionInput } from "../selection_context/position_input";
import { ProviderInput } from "../selection_context/provider_input";
import { RegionInput } from "../selection_context/region_input";

[PositionInput, ProviderInput, RegionInput].forEach((Component) => {
  test(`renders ${Component.name} without error`, () => {
    assert.doesNotThrow(() => <Component />);
  });
});
