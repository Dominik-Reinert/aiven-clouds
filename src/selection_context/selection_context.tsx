import * as React from "react";

export interface SelectionContext {
  lon: number;
  lat: number;
  availableProvider: string[];
  availableLocations: string[];
  setLon?: (lon: number) => void;
  setLat?: (lat: number) => void;
  setAvailableProvider?: (provider: string[]) => void;
  setAvailableLocation?: (locations: string[]) => void;
}

export const defaultSelection: SelectionContext = {
  lon: 0,
  lat: 0,
  availableProvider: [],
  availableLocations: []
};

export const selectionContext = React.createContext(defaultSelection);
