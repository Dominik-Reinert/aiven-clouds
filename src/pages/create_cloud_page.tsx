import * as React from "react";
import { Cloud, cloudStore } from "../store/cloud_store";

interface CreateCloudPageConfig {
  name: string;
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
): (props: P) => JSX.Element | null {
  const { name, cloudDescriptionFormatter = defaultCloudDescriptionFormatter } =
    config;
  const result = React.forwardRef((props: P, ref: any) => {
    const clouds: Cloud[] = cloudStore.getCurrentDataAdapted().clouds;
    clouds.forEach((cloud) => {
      cloud.cloudDescription = cloudDescriptionFormatter(
        cloud.cloudDescription
      );
    });
    return <Component {...props} clouds={clouds} />;
  });

  //needed for identification of the component
  Object.defineProperty(result, "name", { value: name });
  return result;
}
