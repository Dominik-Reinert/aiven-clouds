import * as assert from "power-assert";
import { ServerData } from "../store/server_data";

const testData = { hello: "aiven" };

test("throws suspension data fetch promise", () => {
  const data = new ServerData<typeof testData>({ fetch: async () => testData });
  assert.throws(() => data.get());
});

test("returns data after fetch", async () => {
  console.log("running test");
  let fetchPromiseToReturn: Promise<typeof testData> = new Promise<
    typeof testData
  >((res) => setTimeout(() => res(testData), 1000));
  const fetchCallback = jest.fn(() => fetchPromiseToReturn);
  const data = new ServerData({ fetch: fetchCallback });
  await fetchPromiseToReturn;
  assert.equal(data.get(), testData);
});
