import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme from "enzyme";
import * as React from "react";
import { createCloudPage } from "../pages/create_cloud_page";

Enzyme.configure({ adapter: new Adapter() });

const componentName: string = "TestCloud";
const TestCloud = createCloudPage(
  () => {
    return <div>test</div>;
  },
  { name: componentName }
);

const testData = {};

/*
 * It is not possible to properly test this component, because "ReactDOMServer does not yet support Suspense."
 * The name is wrong to prevent the test command to pick it up as test suite. This throws an error due to
 * no tests being found in test suite
 */

/* beforeAll(() => {
  // taken from https://www.leighhalliday.com/mock-fetch-jest
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(testData) })
  ) as any;
});

test("renders without error", () => {
  assert.doesNotThrow(() => shallow(<TestCloud />));
});

test("should have name set", () => {
  const component = render(<TestCloud />);
  expect(component.get(0).name).toBe(componentName);
}); */
