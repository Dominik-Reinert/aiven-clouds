import * as React from "react";

export interface SelectionContext {
  lon: number;
  lat: number;
  availableProvider: string[];
  selectedProvider: string[];
  availableLocations: string[];
  selectedLocations: string[];
  setLon?: (lon: number) => void;
  setLat?: (lat: number) => void;
  setAvailableProvider?: (provider: string[]) => void;
  setSelectedProvider?: (provider: string[]) => void;
  setAvailableLocation?: (locations: string[]) => void;
  setSelectedLocation?: (locations: string[]) => void;
}

export const defaultSelection: SelectionContext = {
  lon: 0,
  lat: 0,
  availableProvider: [],
  selectedProvider: [],
  availableLocations: [],
  selectedLocations: []
};

export const selectionContext = React.createContext(defaultSelection);
