/**@jsx jsx */
import { jsx } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import { Routes } from "../routes/routes";
import { PositionInput } from "../selection_context/position_input";
import { useStyleContext } from "../style_context/use_style_context";
import { navbarStyle } from "./navbar_style";

export function Navbar(): JSX.Element {
  const styleContext = useStyleContext();
  const location = useLocation();

  function RouteLink(props: { route: Routes; label: string }): JSX.Element {
    const { route, label } = props;
    return (
      <div className={`link ${location.pathname === route ? "active" : ""}`}>
        <Link to={route}>{label}</Link>
      </div>
    );
  }

  return (
    <div css={navbarStyle(styleContext)}>
      <div className="page-name-wrapper">
        <img className="aiven-logo" src="./aiven-home.svg" alt="aiven" />
        <span className="page-name">clouds</span>
      </div>
      <div className="position-input-wrapper">
        <PositionInput />
      </div>
    </div>
  );
}
