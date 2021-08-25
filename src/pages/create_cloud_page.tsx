import * as React from "react";
import { getDistanceFromLatLonInKm } from "../geographical_utils/calculate_distance";
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
    const { lon, lat } = useSelectionContext();
    clouds
      .map((cloud) => ({
        ...cloud,
        cloudDescription: cloudDescriptionFormatter(cloud.cloudDescription),
        distanceInKm: getDistanceFromLatLonInKm(
          lon,
          lat,
          cloud.geoLongitude,
          cloud.geoLatitude
        ),
      }))
      .sort((cloudA: Cloud, cloudB: Cloud) =>
        cloudA.distanceInKm !== undefined && cloudB.distanceInKm !== undefined
          ? cloudA.distanceInKm - cloudB.distanceInKm
          : 0
      );
    // filter by selection
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
