import React from "react";
import { positionContext, PositionContext } from "./position_context";

export function usePositionContext(): PositionContext {
  return React.useContext(positionContext);
}
