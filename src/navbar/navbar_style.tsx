import { css } from "@emotion/react";
import { StyleContext } from "../style_context/style_context";

export const navbarStyle = (styleContext: StyleContext) => css`
  label: navbar;

  display: flex;
  width: ${styleContext.sizes.width.content};
  height: 100px; 

  margin: auto;
  padding: 12px 0;

  .page-name-wrapper {
    display: flex;
    flex: 12 6 200px;

    height: 100%;
    align-items: center;
  }

  .aiven-logo {
    width: 140px;
    height: auto;
  }

  .link-wrapper {
    display: flex;
    flex: 1 2 300px;
    font-size: ${styleContext.sizes.font.text};
    
    height: 100%;
    align-items: center;
    
    margin-top: 8px;
  }

  .page-name {
    font-size: ${styleContext.sizes.font.subHeadline};
    margin: 16px 16px 14px;
    color: ${styleContext.shades.text};
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
