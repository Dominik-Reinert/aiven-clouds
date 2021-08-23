import * as React from "react";
import { cloudStore } from "../store/cloud_store";
import { jsx } from "@emotion/react";

/**@jsx jsx */

export function HomePage(): JSX.Element {
  return (
    <React.Suspense fallback="Fetching clouds...">
      <HomePageSuspending />
    </React.Suspense>
  );
}

function HomePageSuspending(): JSX.Element {
  console.log(
    `Data arrived! ${JSON.stringify(cloudStore.getCurrentDataAdapted())}`
  );
  return <div>Hello suspense</div>;
}
