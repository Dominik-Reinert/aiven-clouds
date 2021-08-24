import { css, SerializedStyles } from "@emotion/react";
import { StyleContext } from "../style_context/style_context";

export function homePageStyle(styleContext: StyleContext): SerializedStyles {
  return css`
    label: home-page;

    display: flex;

    margin: 80px auto;
    flex-direction: column;
    width: 70%;
    text-align: center;

    .welcome {
      font-size: ${styleContext.sizes.font.welcome};
      color: ${styleContext.shades.text};
    }

    .instruction {
      font-size: ${styleContext.sizes.font.headline};
      color: ${styleContext.shades.text};
    }
  `;
}
