import * as React from "react";
import { styleContext, StyleContext } from "./style_context";

export function useStyleContext(): StyleContext {
  return React.useContext(styleContext);
}

