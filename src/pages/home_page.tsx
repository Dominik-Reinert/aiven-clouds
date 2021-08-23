import * as React from "react";

/**@jsx jsx */
import {jsx} from '@emotion/react'

export function HomePage(): JSX.Element {
  return (
    <React.Suspense fallback="Fetching clouds...">
      <HomePageSuspending />
    </React.Suspense>
  );
}

function HomePageSuspending(): JSX.Element {
  return (
    <div>
      Welcome to the home page of my assessment! Use the navbar navigation
      buttons to either list the amazon clouds, or the google clouds!
    </div>
  );
}
