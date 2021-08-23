import { css } from "@emotion/react";
import { StyleContext } from "../style_context/style_context";

export const navbarStyle = (styleContext: StyleContext) => css`
  label: navbar;

  display: flex;
  width: ${styleContext.sizes.width.content};
  margin: auto;
  height: 100px;

  .page-name-wrapper {
    margin: auto;
    flex: 12 6 200px;
    display: flex;
  }

  .link-wrapper {
    display: flex;
    flex: 1 2 300px;
    font-size: ${styleContext.sizes.font.text};
    margin: 12px 0 4px;
  }

  .page-name {
    font-size: ${styleContext.sizes.font.headline};
    margin-right: 16px;
    color: ${styleContext.shades.text};
  }

  .dev-name {
    font-size: ${styleContext.sizes.font.smallText};
    color: ${styleContext.shades.text};
    align-self: flex-end;
    margin-bottom: 6px;
  }

  .link {
    height: 100%;
    flex: 1 0 0;
    display: inline-flex;
    align-items: center;

    a {
      padding-bottom: 8px;
      color: ${styleContext.shades.text};
    }
  }

  .active {
    a {
      padding-bottom: 7px;
      color: ${styleContext.shades.text};
      border-bottom: 1px solid ${styleContext.shades.text};
    }
  }

  @media only screen and (max-width: 1000px) {
    .dev-name {
      display: none;
    }
  }
`;
