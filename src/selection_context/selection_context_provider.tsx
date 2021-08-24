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
  const [onSetAvailableProvider] = useAvailableProvider(selection, setSelection);
  return (
    <selectionContext.Provider
      value={{
        ...selection,
        setLon: onSetLon,
        setLat: onSetLat
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
  selection: SelectionContext,
  setSelection: React.Dispatch<React.SetStateAction<SelectionContext>>
): [onSetAvailableProvider: (availableProvider: string[]) => void] {
  const onSetAvailableProvider = React.useCallback(
    (availableProvider: string[]) =>
      setSelection({ ...selection, availableProvider }),
    [selection, setSelection]
  );
  return [onSetAvailableProvider];
}
