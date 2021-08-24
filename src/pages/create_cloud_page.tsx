import * as React from "react";
import { useSelectionContext } from "../selection_context/use_selection_context";
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

enum ProviderToPrefix {
  AMAZON = "aws",
  AZURE = "azure",
  GOOGLE = "google",
  DO = "do",
}

export function createCloudPage<P>(
  Component: (props: P & ExtendedProps) => JSX.Element,
  config: CreateCloudPageConfig
): (props: P) => JSX.Element | null {
  const { name, cloudDescriptionFormatter = defaultCloudDescriptionFormatter } =
    config;
  const result = React.forwardRef((props: P) => {
    const clouds: Cloud[] = cloudStore.getCurrentDataAdapted().clouds;
    useAvailableProviderUpdate(clouds);
    useAvailableLocationsUpdate(clouds);
    clouds.forEach((cloud) => {
      cloud.cloudDescription = cloudDescriptionFormatter(
        cloud.cloudDescription
      );
    });
    // filter by selection
    // order by distance
    return <Component {...props} clouds={clouds} />;
  });

  //needed for identification of the component
  Object.defineProperty(result, "name", { value: name });
  return result;
}

function useAvailableProviderUpdate(clouds: Cloud[]): void {
  const { availableProvider, setAvailableProvider } = useSelectionContext();
  const newProvider = Array.from(
    new Set(clouds.map((cloud) => cloud.cloudName.split("-")[0]))
  );
  if (
    availableProvider.filter((value) => newProvider.includes(value)).length > 0
  ) {
    setAvailableProvider?.(newProvider);
  }
}

function useAvailableLocationsUpdate(clouds: Cloud[]): void {
  const { availableLocations, setAvailableLocation } = useSelectionContext();
  const newLocations = Array.from(
    new Set(clouds.map((cloud) => cloud.geoRegion))
  );
  if (
    availableLocations.filter((value) => newLocations.includes(value)).length >
    0
  ) {
    setAvailableLocation?.(newLocations);
  }
}
