import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { shallow } from "enzyme";
import * as assert from "power-assert";
import * as React from "react";
import App from "../App";

Enzyme.configure({ adapter: new Adapter() });

test("renders without error", () => {
  assert.doesNotThrow(() => shallow(<App />));
});
