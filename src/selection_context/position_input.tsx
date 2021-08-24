import * as React from "react";
import { useSelectionContext } from "./use_selection_context";

export function PositionInput(): JSX.Element {
  const { lon, lat, setLon, setLat } = useSelectionContext();
  return (
    <div>
      <input
        type="number"
        value={lon}
        onChange={(evt) => setLon?.(Number(evt.target.value))}
      />
      <input
        type="number"
        value={lat}
        onChange={(evt) => setLat?.(Number(evt.target.value))}
      />
    </div>
  );
}
