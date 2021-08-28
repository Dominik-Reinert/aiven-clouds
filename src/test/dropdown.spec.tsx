import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { mount, shallow } from "enzyme";
import * as assert from "power-assert";
import * as React from "react";
import {
  DropdownComponent,
  DropdownComponentProps,
} from "../dropdown/dropdown_component";

Enzyme.configure({ adapter: new Adapter() });

test("renders Dropdown without error", () => {
  assert.doesNotThrow(() =>
    shallow(<DropdownComponent items={[]} label="test" onSelect={() => {}} />)
  );
});

const testItems: DropdownComponentProps["items"] = [
  {
    id: "unselected",
    label: "unselected",
    selected: false,
  },
  {
    id: "selected",
    label: "selected",
    selected: true,
  },
];

test("should open on header click", () => {
  const component = mount(
    <DropdownComponent label="test" items={testItems} onSelect={() => {}} />
  );
  component.find(`.header`).simulate("click");
  component.update();
  expect(component.find(".items").get(0)).toBeDefined();
});

test("should render selected item", () => {
  const component = mount(
    <DropdownComponent label="test" items={testItems} onSelect={() => {}} />
  );
  //open the dropdown
  component.find(`.header`).simulate("click");
  component.update();

  expect(component.find(".item").filter(":not(.selected)").length).toBe(1);
});

test("should render selected item", () => {
  const component = mount(
    <DropdownComponent label="test" items={testItems} onSelect={() => {}} />
  );
  //open the dropdown
  component.find(`.header`).simulate("click");
  component.update();

  expect(component.find(".item.selected").length).toBe(1);
});

test("should emit clicked item's id", () => {
  const onSelect = jest.fn();
  const component = mount(
    <DropdownComponent label="test" items={testItems} onSelect={onSelect} />
  );
  //open the dropdown
  component.find(`.header`).simulate("click");
  component.update();

  component
    .find(`.item`)
    .filterWhere((c) => c.text() === testItems[0].label)
    .simulate("click");
  expect(onSelect).toBeCalled();
  expect(onSelect).toBeCalledWith(testItems[0].id);
});

test("should render number of selected items", () => {
  const onSelect = jest.fn();
  const component = mount(
    <DropdownComponent label="test" items={testItems} onSelect={() => {}} />
  );
  expect(component.find(".number-selected").length).toBe(1);
});
