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
  const result = React.forwardRef((props: P, ref) => {
    let clouds: Cloud[] = cloudStore.getCurrentDataAdapted().clouds;
    useAvailableProviderUpdate(clouds);
    useAvailableLocationsUpdate(clouds);
    const { lon, lat, selectedLocations, selectedProvider } =
      useSelectionContext();
    clouds = clouds
      .filter((cloud) => selectedLocations.includes(cloud.geoRegion))
      .filter((cloud) =>
        selectedProvider.includes(getProviderFromCloudName(cloud.cloudName))
      )
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
    return <Component ref={ref} {...props} clouds={clouds} />;
  });

  //needed for identification of the component
  Object.defineProperty(result, "name", { value: name });
  return result;
}

function getProviderFromCloudName(cloudName: string): string {
  return cloudName.split("-")[0];
}

function useAvailableProviderUpdate(clouds: Cloud[]): void {
  const { availableProvider, setAvailableProvider, setSelectedProvider } =
    useSelectionContext();
  const newProvider = Array.from(
    new Set(clouds.map((cloud) => getProviderFromCloudName(cloud.cloudName)))
  );
  if (
    newProvider.filter((value) => availableProvider.includes(value)).length !==
    newProvider.length
  ) {
    //need to copy the arrays, otherwise some funky stuff is happening when selecting a new location
    setAvailableProvider?.([...newProvider]);
    setSelectedProvider?.([...newProvider]);
  }
}

function useAvailableLocationsUpdate(clouds: Cloud[]): void {
  const { availableLocations, setAvailableLocation, setSelectedLocation } =
    useSelectionContext();
  const newLocations = Array.from(
    new Set(clouds.map((cloud) => cloud.geoRegion))
  );
  if (
    newLocations.filter((value) => availableLocations.includes(value))
      .length !== newLocations.length
  ) {
    //need to copy the arrays, otherwise some funky stuff is happening when selecting a new location
    setAvailableLocation?.([...newLocations]);
    setSelectedLocation?.([...newLocations]);
  }
}
