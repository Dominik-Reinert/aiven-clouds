/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import { Routes } from "../routes/routes";
import { useStyleContext } from "../style_context/use_style_context";

export function Navbar(): JSX.Element {
  const styleContext = useStyleContext();
  const location = useLocation();
  return (
    <div
      css={css`
        label: navbar;

        display: flex;
        width: ${styleContext.sizes.width.content};
        margin: auto;
        height: 56px;

        .name-wrapper {
          margin: auto;
          flex: 12 6 200px;
          font-size: ${styleContext.sizes.font.subHeadline};
        }

        .link-wrapper {
          display: flex;
          flex: 1 2 300px;
          font-size: ${styleContext.sizes.font.text};
          margin: 12px 0 4px;
        }

        .first-name {
          margin-right: 8px;
          color: ${styleContext.shades.selectedText};
        }

        .last-name {
          color: ${styleContext.colors.highlight};
        }

        .link {
          height: 100%;
          flex: 1 0 0;
          display: inline-flex;
          align-items: center;

          a {
            padding-bottom: 8px;
          }
        }

        .active {
          a {
            padding-bottom: 7px;
            border-bottom: 1px solid ${styleContext.colors.highlight};
          }
        }
      `}
    >
      <div className="name-wrapper">
        <span className="first-name">Dominik</span>
        <span className="last-name">Reinert</span>
      </div>
      <div className="link-wrapper">
        <div
          className={`link ${
            location.pathname === Routes.home ? "active" : ""
          }`}
        >
          <Link to={Routes.home}>Home</Link>
        </div>
      </div>
    </div>
  );
}
