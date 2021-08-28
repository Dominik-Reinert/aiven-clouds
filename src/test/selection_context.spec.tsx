import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { shallow } from "enzyme";
import * as assert from "power-assert";
import React from "react";
import { PositionInput } from "../selection_context/position_input";
import { ProviderInput } from "../selection_context/provider_input";
import { RegionInput } from "../selection_context/region_input";

Enzyme.configure({ adapter: new Adapter() });

[PositionInput, ProviderInput, RegionInput].forEach((Component) => {
  test(`renders ${Component.name} without error`, () => {
    assert.doesNotThrow(() => shallow(<Component />));
  });
});
