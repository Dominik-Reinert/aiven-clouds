import React from "react";
import {
  defaultSelection,
  SelectionContext,
  selectionContext,
} from "./selection_context";

export function SelectionContextProvider(
  props: React.PropsWithChildren<{}>
): JSX.Element {
  const [selection, setSelection] =
    React.useState<SelectionContext>(defaultSelection);
  const [onSetLon, onSetLat] = usePosition(selection, setSelection);
  const [onSetAvailableProvider] = useAvailableProvider(setSelection);
  const [onSetAvailableLocation] = useAvailableLocations(setSelection);
  const [onSetSelectedLocation] = useSelectedLocations(setSelection);
  const [onSetSelectedProvider] = useSelectedProvider(setSelection);
  return (
    <selectionContext.Provider
      value={{
        ...selection,
        setLon: onSetLon,
        setLat: onSetLat,
        setAvailableProvider: onSetAvailableProvider,
        setAvailableLocation: onSetAvailableLocation,
        setSelectedLocation: onSetSelectedLocation,
        setSelectedProvider: onSetSelectedProvider,
      }}
    >
      {props.children}
    </selectionContext.Provider>
  );
}

function usePosition(
  selection: SelectionContext,
  setSelection: React.Dispatch<React.SetStateAction<SelectionContext>>
): [onSetLon: (lon: number) => void, onSetLat: (lat: number) => void] {
  const onSetLon = React.useCallback(
    (lon: number) => setSelection({ ...selection, lat: selection.lat, lon }),
    [selection, setSelection]
  );
  const onSetLat = React.useCallback(
    (lat: number) =>
      setSelection({ ...selection, lat: lat, lon: selection.lon }),
    [selection, setSelection]
  );
  return [onSetLon, onSetLat];
}

function useAvailableProvider(
  setSelection: React.Dispatch<React.SetStateAction<SelectionContext>>
): [onSetAvailableProvider: (availableProvider: string[]) => void] {
  const onSetAvailableProvider = React.useCallback(
    (availableProvider: string[]) =>
      setSelection((state) => ({ ...state, availableProvider })),
    [setSelection]
  );
  return [onSetAvailableProvider];
}

function useAvailableLocations(
  setSelection: React.Dispatch<React.SetStateAction<SelectionContext>>
): [onSetAvailableLocation: (availableLocation: string[]) => void] {
  const onSetAvailableLocations = React.useCallback(
    (availableLocations: string[]) =>
      setSelection((state) => ({ ...state, availableLocations })),
    [setSelection]
  );
  return [onSetAvailableLocations];
}

function useSelectedLocations(
  setSelection: React.Dispatch<React.SetStateAction<SelectionContext>>
): [onSetSelectedLocation: (selectedLocation: string[]) => void] {
  const onSetSelectedLocations = React.useCallback(
    (selectedLocations: string[]) =>
      setSelection((state) => ({ ...state, selectedLocations })),
    [setSelection]
  );
  return [onSetSelectedLocations];
}

function useSelectedProvider(
  setSelection: React.Dispatch<React.SetStateAction<SelectionContext>>
): [onSetSelectedLocation: (selectedLocation: string[]) => void] {
  const onSetSelectedProvider = React.useCallback(
    (selectedProvider: string[]) =>
      setSelection((state) => ({ ...state, selectedProvider })),
    [setSelection]
  );
  return [onSetSelectedProvider];
}
