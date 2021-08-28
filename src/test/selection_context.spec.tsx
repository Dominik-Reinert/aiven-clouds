import { renderHook } from "@testing-library/react-hooks";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { shallow } from "enzyme";
import * as assert from "power-assert";
import React from "react";
import { PositionInput } from "../selection_context/position_input";
import { ProviderInput } from "../selection_context/provider_input";
import { RegionInput } from "../selection_context/region_input";
import { SelectionContext } from "../selection_context/selection_context";
import { useSelectionContext } from "../selection_context/use_selection_context";

Enzyme.configure({ adapter: new Adapter() });

[PositionInput, ProviderInput, RegionInput].forEach((Component) => {
  test(`renders ${Component.name} without error`, () => {
    assert.doesNotThrow(() => shallow(<Component />));
  });
});

const expectedDefaultSelection: SelectionContext = {
  lon: 0,
  lat: 0,
  availableProvider: [],
  selectedProvider: [],
  availableLocations: [],
  selectedLocations: [],
};

test("selection context should have initial selection", () => {
  const {
    result: { current: defaultSelection },
  } = renderHook(() => useSelectionContext());

  assert.deepStrictEqual(defaultSelection, expectedDefaultSelection);
});
