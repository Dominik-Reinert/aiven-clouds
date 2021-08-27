import * as assert from "power-assert";
import { AbstractStore } from "../store/abstract_store";

interface SimpleSeverData {
  my_name: string;
  my_last_name: string;
}

interface SimpleAdaptedData {
  myName: string;
  myLastName: string;
}

class SimpleStore extends AbstractStore<SimpleSeverData, SimpleAdaptedData> {
  public adaptData(data: SimpleSeverData): SimpleAdaptedData {
    return {
      myName: data.my_name,
      myLastName: data.my_last_name,
    };
  }
}

const initialData: SimpleSeverData = {
  my_name: "Dominik",
  my_last_name: "Reinert",
};
const changedData: SimpleSeverData = {
  my_name: "Hello",
  my_last_name: "Aiven",
};
const testStore = new SimpleStore(initialData);

test("holds initial data", () => {
  const currentData = testStore.getCurrentDataAdapted();
  assert.deepStrictEqual(currentData.myName, initialData.my_name);
  assert.deepStrictEqual(currentData.myLastName, initialData.my_last_name);
});

test("can change data", () => {
  testStore.produceNewData(() => changedData);
  const currentData = testStore.getCurrentDataAdapted();
  assert.deepStrictEqual(currentData.myName, changedData.my_name);
  assert.deepStrictEqual(currentData.myLastName, changedData.my_last_name);
});

test("can reset data", () => {
  testStore.produceNewData(() => changedData);
  testStore.reset();
  const currentData = testStore.getCurrentDataAdapted();
  assert.deepStrictEqual(currentData.myName, initialData.my_name);
  assert.deepStrictEqual(currentData.myLastName, initialData.my_last_name);
});
