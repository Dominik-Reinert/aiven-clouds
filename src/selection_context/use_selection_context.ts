import React from "react";
import { selectionContext, SelectionContext } from "./selection_context";

export function useSelectionContext(): SelectionContext {
  return React.useContext(selectionContext);
}
