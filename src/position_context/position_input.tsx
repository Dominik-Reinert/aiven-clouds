import * as React from "react";
import { usePositionContext } from "./use_position_context";

export function PositionInput(): JSX.Element {
  const { lon, lat, setLon, setLat } = usePositionContext();
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
