import { css, SerializedStyles } from "@emotion/react";
import { StyleContext } from "../style_context/style_context";

export function positionInputStyle(
  styleContext: StyleContext
): SerializedStyles {
  return css`
    label: position-input;

    color: ${styleContext.shades.text};

    .input-wrapper {
      position: relative;

      input {
        position: absolute;
        right: 0px;
      }
    }
  `;
}
