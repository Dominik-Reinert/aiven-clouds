import * as React from "react";
import { Cloud, cloudStore } from "../store/cloud_store";

interface CreateCloudPageConfig {
  fallback: string;
  cloudNamePrefix: string;
}

interface ExtendedProps {
  clouds?: Cloud[];
}

export function createCloudPage<P>(
  Component: (props: P & ExtendedProps) => JSX.Element,
  config: CreateCloudPageConfig
): (props: P) => JSX.Element {
  const { fallback, cloudNamePrefix } = config;
  return (props) => {
    return (
      <React.Suspense fallback={fallback}>
        <SuspendingCloudPage
          Component={Component}
          componentProps={props}
          cloudNamePrefix={cloudNamePrefix}
        />
      </React.Suspense>
    );
  };
}

function SuspendingCloudPage<P>(props: {
  Component: (p: P) => JSX.Element;
  componentProps: P;
  cloudNamePrefix: string;
}): JSX.Element {
  const { Component, componentProps, cloudNamePrefix } = props;
  const clouds: Cloud[] = cloudStore
    .getCurrentDataAdapted()
    .clouds.filter((cloud) => cloud.cloudName?.startsWith(cloudNamePrefix));

  return <Component {...componentProps} clouds={clouds} />;
}
