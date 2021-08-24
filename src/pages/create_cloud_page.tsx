import * as React from "react";
import { Cloud, cloudStore } from "../store/cloud_store";

interface CreateCloudPageConfig {
  fallback: string;
  cloudNamePrefix: string;
  cloudDescriptionFormatter?: (description: string) => string;
}

interface ExtendedProps {
  clouds?: Cloud[];
}

// Removes all the unnecessary information in the description
const defaultCloudDescriptionFormatter = (description: string) => {
  const splits: string[] = description.split(":");
  return splits[splits.length - 1];
};

export function createCloudPage<P>(
  Component: (props: P & ExtendedProps) => JSX.Element,
  config: CreateCloudPageConfig
): (props: P) => JSX.Element {
  const {
    fallback,
    cloudNamePrefix,
    cloudDescriptionFormatter = defaultCloudDescriptionFormatter,
  } = config;
  return (props) => {
    return (
      <React.Suspense fallback={fallback}>
        <SuspendingCloudPage
          Component={Component}
          componentProps={props}
          cloudNamePrefix={cloudNamePrefix}
          cloudDescriptionFormatter={cloudDescriptionFormatter}
        />
      </React.Suspense>
    );
  };
}

function SuspendingCloudPage<P>(props: {
  Component: (p: P) => JSX.Element;
  componentProps: P;
  cloudNamePrefix: string;
  cloudDescriptionFormatter: (description: string) => string;
}): JSX.Element {
  const {
    Component,
    componentProps,
    cloudNamePrefix,
    cloudDescriptionFormatter,
  } = props;
  const clouds: Cloud[] = cloudStore
    .getCurrentDataAdapted()
    .clouds.filter((cloud) => cloud.cloudName?.startsWith(cloudNamePrefix));
  clouds.forEach((cloud) => {
    cloud.cloudDescription = cloudDescriptionFormatter(cloud.cloudDescription);
  });

  return <Component {...componentProps} clouds={clouds} />;
}
