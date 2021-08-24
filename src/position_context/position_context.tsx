import * as React from "react";

export interface PositionContext {
  lon: number;
  lat: number;
  setLon?: (lon: number) => void;
  setLat?: (lat: number) => void;
}

export const defaultPosition: PositionContext = { lon: 0, lat: 0 };

export const positionContext = React.createContext(defaultPosition);
