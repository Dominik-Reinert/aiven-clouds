import { css, SerializedStyles } from "@emotion/react";
import { StyleContext } from "../style_context/style_context";

export function cloudStyle(styleContext: StyleContext): SerializedStyles {
  return css`
    label: cloud-component;

    width: 70%;

    background-color: ${styleContext.colors.cardBackground};
    border-bottom: 1px solid ${styleContext.colors.aivenBright};

    margin: auto auto 0;
    padding: 16px;

    display: flex;
    align-items: center;

    .description {
      font-size: ${styleContext.sizes.font.text};
      color: ${styleContext.colors.aivenDark};
    }

    .name {
      margin-left: 4px;
      color: ${styleContext.colors.aivenDark};
    }

    .name,
    .region,
    .distance,
    .coordinates {
      font-size: ${styleContext.sizes.font.smallText};
      text-align: center;
    }

    > * {
      flex: 1 0 0;
    }
  `;
}
